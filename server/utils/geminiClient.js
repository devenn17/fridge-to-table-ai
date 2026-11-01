import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

/**
 * Collects all configured Gemini API keys from environment.
 * Supports:
 *   - GEMINI_API_KEYS=key1,key2,key3
 *   - GEMINI_API_KEY=key1
 */
export function getGeminiKeys() {
  const keysStr = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || "";
  return keysStr
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

const FALLBACK_MODELS = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Executes a Gemini request with automatic multi-key rotation, model fallback, AND 429 auto-retry.
 */
export async function callGeminiWithRotation(contents, preferredModel = "gemini-2.0-flash") {
  const keys = getGeminiKeys();
  if (keys.length === 0) {
    throw new Error("No Gemini API keys found in environment.");
  }

  const modelsToTry = [
    preferredModel,
    ...FALLBACK_MODELS.filter((m) => m !== preferredModel),
  ];

  let lastError = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    for (const key of keys) {
      const genAI = new GoogleGenerativeAI(key);

      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: { maxOutputTokens: 8192 },
          });
          const result = await model.generateContent(contents);
          return result.response.text();
        } catch (err) {
          lastError = err;
          const msg = err.message || "";
          const isRateLimit =
            msg.includes("429") ||
            msg.toLowerCase().includes("quota") ||
            msg.toLowerCase().includes("resource_exhausted");

          const isNotFound = msg.includes("404") || msg.toLowerCase().includes("not found");

          if (isRateLimit || isNotFound) {
            console.warn(`[Gemini] Model (${modelName}) ${isRateLimit ? "rate limited (429)" : "not found (404)"}. Trying fallback model/key...`);
            continue; // Try next model variant
          }
          break;
        }
      }
    }

    // If all keys/models hit 429, wait 3 seconds before attempt #2
    if (attempt === 0) {
      console.warn("[Gemini] All keys/models rate limited. Waiting 3 seconds before auto-retry...");
      await sleep(3000);
    }
  }

  throw lastError || new Error("Gemini execution failed across all keys, model variants, and retries.");
}
