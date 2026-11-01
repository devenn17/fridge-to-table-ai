import OpenAI from "openai";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import { callGeminiWithRotation } from "../utils/geminiClient.js";

dotenv.config();

const RECIPE_CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Dessert",
  "Drink",
];

const TIME_BUCKETS = [5, 10, 15, 20, 30, 45, 60];

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

async function callOpenAIText(prompt) {
  const openai = getOpenAIClient();
  if (!openai) {
    throw new Error("OPENAI_API_KEY is not set.");
  }
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 8000,
  });
  return response.choices[0]?.message?.content || "";
}

/**
 * Secondary Backup Text Generator using Groq AI.
 */
export async function callGroqText(prompt) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set.");
  }
  const groq = new Groq({ apiKey });

  const textModels = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
    "mixtral-8x7b-32768",
  ];

  let lastErr = null;
  for (const model of textModels) {
    try {
      console.log(`[Groq AI Text] Generating with model ${model}...`);
      const response = await groq.chat.completions.create({
        model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5,
        max_completion_tokens: 4000,
      });

      return response.choices[0]?.message?.content || "";
    } catch (err) {
      lastErr = err;
      console.warn(`[Groq Text] Model (${model}) failed:`, err.message);
    }
  }
  throw lastErr || new Error("Groq text generation failed across all models.");
}

function safeParseJsonArray(text) {
  if (!text || typeof text !== "string") {
    throw new Error("Empty response received from AI model.");
  }

  let cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const match = cleaned.match(/\[[\s\S]*\]/);
  if (match) {
    cleaned = match[0];
  }

  // Remove trailing commas before ] or }
  cleaned = cleaned.replace(/,\s*([\]\}])/g, "$1");

  // Replace unescaped control characters (newlines/tabs inside string literals) with space
  cleaned = cleaned.replace(/[\u0000-\u001F]+/g, (m) => (m.includes("\n") || m.includes("\r") ? " " : ""));

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.warn("[safeParseJsonArray] Standard JSON parse failed, repairing JSON string...", err.message);

    // Fallback repair: cut at last valid object end and close the array
    const lastObjEnd = cleaned.lastIndexOf("}");
    if (lastObjEnd !== -1) {
      let repaired = cleaned.slice(0, lastObjEnd + 1);
      repaired = repaired.replace(/,\s*$/, "") + "\n]";
      try {
        return JSON.parse(repaired);
      } catch (err2) {
        console.error("[safeParseJsonArray] JSON repair also failed:", err2.message);
      }
    }
    throw err;
  }
}

/**
 * Normalizes an ingredient string for matching.
 */
function normalizeIng(name) {
  return String(name || "")
    .toLowerCase()
    .trim()
    .replace(/s$/, ""); // basic singularization
}

export async function generateRecipes(ingredients) {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return [];
  }

  const prompt = `
You are an expert master chef. Given a list of available pantry ingredients, generate EVERY realistic, delicious recipe that can be prepared using these ingredients.

Available pantry ingredients:
${ingredients.join(", ")}

Requirements:
1. GENERATE 12 to 16 DIVERSE, HIGH-QUALITY RECIPES. Include a rich mix of Breakfast, Lunch, Dinner, Snack, and Dessert options.
2. INCLUDE PARTIAL MATCHES: Include recipes where 100% of required ingredients are available, as well as recipes where 70%-90% are available (where only 1 or 2 non-essential items are missing).
3. DO NOT require every ingredient. If a recipe calls for an ingredient not in the pantry (e.g. garlic, butter, oregano, cream), list it in "missingIngredients" and include the recipe!
4. Return rich metadata for EVERY recipe:
   - title (string)
   - description (short mouth-watering description)
   - cuisine (e.g. Indian, Italian, Chinese, Mexican, American, French, Continental, Mediterranean, Japanese, Thai)
   - category (Breakfast, Lunch, Dinner, Snack, Dessert, or Drink)
   - cookTimeMinutes (integer between 5 and 90)
   - time (e.g. "20 min")
   - difficulty (Easy, Medium, or Hard)
   - servings (e.g. "2" or "4")
   - calories (approx, e.g. "350 kcal")
   - protein (e.g. "15g")
   - carbs (e.g. "30g")
   - fat (e.g. "10g")
   - usedIngredients (array of ingredients present in pantry used by recipe)
   - missingIngredients (array of ingredients required by recipe but missing from pantry)
   - matchPercentage (integer between 60 and 100, where 100 means all ingredients are available)
   - instructions (array of step-by-step strings)
   - chefTip (optional pro chef tip)

Return ONLY valid JSON array. No conversational text. No markdown header outside JSON.

Format:
[
  {
    "title": "Cheese Sandwich",
    "description": "Crispy toasted sandwich with melted cheese.",
    "cuisine": "American",
    "category": "Snack",
    "cookTimeMinutes": 10,
    "time": "10 min",
    "difficulty": "Easy",
    "servings": "2",
    "calories": "280 kcal",
    "protein": "12g",
    "carbs": "25g",
    "fat": "14g",
    "usedIngredients": ["Bread", "Cheese", "Butter"],
    "missingIngredients": [],
    "matchPercentage": 100,
    "instructions": ["Butter bread slices.", "Place cheese between slices.", "Toast on pan until golden."],
    "chefTip": "Use medium heat for an even golden crust."
  }
]`;

  let text = "";
  try {
    text = await callGeminiWithRotation([prompt]);
  } catch (geminiErr) {
    console.warn("[generateRecipes] Gemini failed/rate limited. Trying Groq AI secondary backup...", geminiErr.message);
    try {
      text = await callGroqText(prompt);
    } catch (groqErr) {
      console.warn("[generateRecipes] Groq AI backup failed, trying OpenAI...", groqErr.message);
      try {
        text = await callOpenAIText(prompt);
      } catch (oaiErr) {
        console.error("[generateRecipes] All AI providers failed:", oaiErr.message);
        throw geminiErr;
      }
    }
  }

  const rawRecipes = safeParseJsonArray(text);
  const pantrySet = new Set(ingredients.map((i) => normalizeIng(i)));

  // Deduplicate and process metadata & match percentages
  const seenTitles = new Set();
  const processedRecipes = [];

  for (const r of rawRecipes) {
    if (!r || !r.title) continue;

    const titleKey = r.title.toLowerCase().trim();
    if (seenTitles.has(titleKey)) continue;
    seenTitles.add(titleKey);

    const cookTimeMinutes =
      Number(r.cookTimeMinutes) ||
      parseInt(String(r.time || "").replace(/\D/g, ""), 10) ||
      20;

    let used = Array.isArray(r.usedIngredients) ? r.usedIngredients : [];
    let missing = Array.isArray(r.missingIngredients) ? r.missingIngredients : [];

    // Fallback if ingredients field was provided instead of used/missing
    if (used.length === 0 && Array.isArray(r.ingredients)) {
      used = [];
      missing = [];
      for (const item of r.ingredients) {
        const itemStr = String(item);
        if (pantrySet.has(normalizeIng(itemStr))) {
          used.push(itemStr);
        } else {
          missing.push(itemStr);
        }
      }
    }

    // Recalculate match percentage accurately
    const totalCount = used.length + missing.length;
    let matchPct = 100;
    if (totalCount > 0) {
      matchPct = Math.round((used.length / totalCount) * 100);
    }
    if (typeof r.matchPercentage === "number" && r.matchPercentage > 0) {
      matchPct = Math.max(matchPct, Math.min(100, Math.round(r.matchPercentage)));
    }

    processedRecipes.push({
      ...r,
      title: r.title.trim(),
      description: r.description || "",
      cuisine: r.cuisine || "Continental",
      category: RECIPE_CATEGORIES.includes(r.category) ? r.category : "Lunch",
      cookTimeMinutes,
      time: r.time || `${cookTimeMinutes} min`,
      difficulty: ["Easy", "Medium", "Hard"].includes(r.difficulty) ? r.difficulty : "Easy",
      servings: r.servings || "2",
      calories: r.calories || "300 kcal",
      protein: r.protein || "10g",
      carbs: r.carbs || "30g",
      fat: r.fat || "10g",
      ingredients: [...used, ...missing],
      usedIngredients: used,
      missingIngredients: missing,
      matchPercentage: matchPct,
      instructions: Array.isArray(r.instructions) ? r.instructions : [],
      chefTip: r.chefTip || "",
    });
  }

  // Sort recipes by match percentage descending (100% matches first)
  processedRecipes.sort((a, b) => b.matchPercentage - a.matchPercentage);

  return processedRecipes;
}

/**
 * Cuisine generator using pantry ingredients.
 */
export async function generateCuisineRecipes(ingredients, cuisine) {
  const masterRecipes = await generateRecipes(ingredients);
  const matching = masterRecipes.filter(
    (r) => String(r.cuisine).toLowerCase() === cuisine.toLowerCase()
  );
  if (matching.length > 0) {
    return matching;
  }
  return masterRecipes;
}

export { RECIPE_CATEGORIES, TIME_BUCKETS };
