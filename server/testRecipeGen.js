import { generateRecipes } from "./services/geminiService.js";

async function test() {
  try {
    console.log("Testing generateRecipes with Gemini AI...");
    const samplePantry = ["tomato", "cheese", "bread", "milk", "egg", "spinach"];
    const recipes = await generateRecipes(samplePantry);
    console.log(`Generated ${recipes.length} recipes successfully!`);
    console.log("First recipe sample:", recipes[0]);
  } catch (err) {
    console.error("FAILED Recipe generation:", err);
  }
}

test();
