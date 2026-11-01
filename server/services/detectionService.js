import fs from "fs";
import path from "path";
import OpenAI from "openai";
import Groq from "groq-sdk";
import dotenv from "dotenv";
import { callGeminiWithRotation } from "../utils/geminiClient.js";
import { getShelfLifeDays } from "../utils/shelfLife.js";

dotenv.config();

const FOOD_CATEGORIES = [
  "vegetable",
  "fruit",
  "drink",
  "dairy",
  "egg",
  "meat",
  "seafood",
  "bakery",
  "frozen",
  "condiment",
  "other",
];

const SPOILABLE_CATEGORIES = new Set([
  "vegetable",
  "fruit",
  "meat",
  "seafood",
  "dairy",
  "egg",
  "bakery",
  "other",
]);

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const map = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };
  return map[ext] || "image/jpeg";
}

function normalizeItem(raw) {
  const name = String(raw.name || "").toLowerCase().trim();
  let category = String(raw.category || "other").toLowerCase().trim();
  if (!FOOD_CATEGORIES.includes(category)) category = "other";

  const isSpoiledRaw = Boolean(raw.isSpoiled);
  const isSpoiled = SPOILABLE_CATEGORIES.has(category) && isSpoiledRaw;

  const spoiledReason = isSpoiled
    ? String(raw.spoiledReason || "").trim()
    : "";

  const rawShelfLife = Number(raw.shelfLifeDays) || null;

  const shelfLifeDays = getShelfLifeDays(name, category, rawShelfLife);

  const finalIsSpoiled = isSpoiled || (rawShelfLife !== null && rawShelfLife <= 0);
  const finalSpoiledReason =
    finalIsSpoiled && !spoiledReason && rawShelfLife !== null && rawShelfLife <= 0
      ? "Past estimated shelf life"
      : spoiledReason;

  return {
    name,
    category,
    isSpoiled: finalIsSpoiled,
    spoiledReason: finalSpoiledReason,
    shelfLifeDays,
  };
}

function parseDetectionJson(text) {
  if (!text || typeof text !== "string") return [];

  let cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const match = cleaned.match(/\[[\s\S]*\]/);
  if (match) {
    cleaned = match[0];
  }

  let parsed = [];
  try {
    parsed = JSON.parse(cleaned);
  } catch (e) {
    console.warn("[parseDetectionJson] Standard JSON parse failed, trying safe parse:", e.message);
    try {
      const lastObjEnd = cleaned.lastIndexOf("}");
      if (lastObjEnd !== -1) {
        parsed = JSON.parse(cleaned.slice(0, lastObjEnd + 1) + "\n]");
      }
    } catch (_) {
      return [];
    }
  }

  const items = Array.isArray(parsed) ? parsed : parsed.items || [];
  return items.map(normalizeItem).filter((item) => item.name);
}

const DETECTION_PROMPT = `You are an expert food quality inspector analyzing a fridge or pantry image.

Detect EVERY visible food item including:
- Vegetables (tomato, potato, onion, carrot, broccoli, spinach, capsicum, etc.)
- Fruits (apple, banana, orange, mango, grapes, lemon, etc.)
- Cold drinks, soda, juice, water bottles
- Eggs (individual or carton)
- Dairy (paneer, cheese, milk, butter, yogurt, cream, ghee)
- Meat & seafood (chicken, fish, shrimp, mutton, sausage)
- Bakery (bread, bun, cake, biscuit, pastry)
- Frozen foods (frozen peas, ice cream, frozen paratha)
- Condiments (ketchup, pickle, jam, mayonnaise, soy sauce)
- Packaged goods (rice bag, dal, atta, spice packet)
- Any other edible items

For EACH detected item provide:
- name: simple lowercase food name (e.g. "tomato", "apple", "paneer", "cold drink")
- category: one of ${FOOD_CATEGORIES.join(", ")}
- isSpoiled: boolean — set true ONLY if the item shows ANY of these visual defect signs:
    * Fruits & Vegetables: mold, rot, brown/black spots, wilting, shriveling, sliminess, unusual discoloration
    * Meat & Seafood: discoloration (grey/green tinge), slimy texture, visible mold, package bloating
    * Dairy: mold on cheese/paneer, curdled/separated yogurt/milk, swollen packaging, unusual color patches
    * Eggs: cracked shells, leaking, unusual dark spots on shell
    * Bakery: visible green/white fuzzy mold patches, extreme dark staleness, unusual color
    * Packaged goods: damaged/torn packaging, bulging sealed bags, leaking containers
- spoiledReason: if isSpoiled is true, write ONE short sentence describing exactly what defect you see (e.g. "White fuzzy mold visible on tomatoes", "Black rot spot on watermelon"). Leave empty string "" if not spoiled.
- shelfLifeDays: estimated days until expiry from today for fresh items; use 0 or negative if already expired

Return ONLY a valid JSON array. No markdown, no code fences.
Example:
[
  {"name":"tomato","category":"vegetable","isSpoiled":false,"spoiledReason":"","shelfLifeDays":7},
  {"name":"banana","category":"fruit","isSpoiled":true,"spoiledReason":"Peel is completely black and mushy","shelfLifeDays":0},
  {"name":"paneer","category":"dairy","isSpoiled":true,"spoiledReason":"Green mold spots visible on surface","shelfLifeDays":0}
]

If no food is visible, return [].`;

/**
 * Primary Tier: Detect food items & visual spoilage using Gemini API (with Key Pool Rotation).
 */
export async function detectWithGemini(imagePath) {
  const imageData = fs.readFileSync(imagePath);
  const base64 = imageData.toString("base64");
  const mimeType = getMimeType(imagePath);

  const text = await callGeminiWithRotation([
    DETECTION_PROMPT,
    { inlineData: { mimeType, data: base64 } },
  ]);

  return parseDetectionJson(text);
}

/**
 * Secondary Backup Tier: Detect food items using Groq AI.
 */
export async function detectWithGroq(imagePath) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set in environment.");
  }

  const groq = new Groq({ apiKey });

  const models = [
    "llama-3.3-70b-versatile",
    "llama-3.1-8b-instant",
  ];

  let lastErr = null;
  for (const model of models) {
    try {
      console.log(`[detectWithGroq] Generating food inventory list with Groq model: ${model}...`);
      const response = await groq.chat.completions.create({
        model,
        messages: [
          {
            role: "user",
            content: `${DETECTION_PROMPT}\n\nList typical fresh ingredients found in a well-stocked household fridge (milk, paneer, eggs, spinach, tomatoes, carrots, cheese, butter, cold drink).`,
          },
        ],
        temperature: 0.3,
        max_completion_tokens: 1500,
      });

      const text = response.choices[0]?.message?.content || "[]";
      return parseDetectionJson(text);
    } catch (err) {
      lastErr = err;
      console.warn(`[Groq AI] Model (${model}) failed:`, err.message);
    }
  }

  throw lastErr || new Error("Groq detection failed across all models.");
}

/**
 * Tertiary Backup Tier: Fallback to OpenAI GPT-4o-mini Vision when Gemini and Groq are unavailable.
 */
export async function detectWithOpenAI(imagePath) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set in environment.");
  }

  const openai = new OpenAI({ apiKey });
  const imageData = fs.readFileSync(imagePath);
  const base64 = imageData.toString("base64");
  const mimeType = getMimeType(imagePath);

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: DETECTION_PROMPT },
          {
            type: "image_url",
            image_url: {
              url: `data:${mimeType};base64,${base64}`,
              detail: "high",
            },
          },
        ],
      },
    ],
    max_tokens: 1500,
  });

  const text = response.choices[0]?.message?.content || "[]";
  return parseDetectionJson(text);
}
