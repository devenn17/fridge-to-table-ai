import express from "express";
import multer from "multer";
import fs from "fs";
import {
  detectWithGemini,
  detectWithGroq,
  detectWithOpenAI,
} from "../services/detectionService.js";
import { getShelfLifeDays } from "../utils/shelfLife.js";
import * as Ingredient from "../models/Ingredient.js";
import { withComputedStatus } from "../utils/shelfLife.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Category → emoji icon
const CATEGORY_ICONS = {
  vegetable: "🥬", fruit: "🍎", dairy: "🥛", egg: "🥚", drink: "🥤",
  meat: "🥩", seafood: "🦐", bakery: "🍞", frozen: "🧊", condiment: "🧂", other: "🍽️",
};

function toLabel(name) {
  return String(name || "").split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

/**
 * Converts a detected item into a pantry-ready record with expiresAt set.
 */
function toPantryRecord(item) {
  const shelfLifeDays = item.shelfLifeDays || 7;
  const expiresAt = new Date(
    Date.now() + shelfLifeDays * 24 * 60 * 60 * 1000
  ).toISOString();
  const icon = CATEGORY_ICONS[item.category] || "🍽️";

  return {
    name: item.name,
    label: toLabel(item.name),
    category: item.category || "other",
    icon,
    quantity: 1,
    unit: "item",
    shelfLifeDays,
    expiresAt,
  };
}

// POST /api/detect — upload image, detect ingredients, auto-save fresh ones to pantry
router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image received" });
  }

  let engineUsed = "Gemini API";
  let items = [];
  let geminiError = null;
  let groqError = null;
  let openAiError = null;

  // ── 1. Try Gemini API (Primary) ──────────────────────────────────────────
  try {
    items = await detectWithGemini(req.file.path);
    engineUsed = "Gemini API";
  } catch (err) {
    geminiError = err;
    console.error("[detect] Gemini Primary failed/rate-limited:", err.message || err);

    // ── 2. Try Groq AI Vision (Secondary Backup) ─────────────────────────
    if (process.env.GROQ_API_KEY) {
      try {
        console.log("[detect] Switching to Groq AI Vision backup...");
        items = await detectWithGroq(req.file.path);
        engineUsed = "Groq AI (Llama 3.2 Vision)";
      } catch (gErr) {
        groqError = gErr;
        console.error("[detect] Groq Secondary Backup failed:", gErr.message || gErr);
      }
    } else {
      groqError = new Error("GROQ_API_KEY is not configured in server/.env");
    }

    // ── 3. Try OpenAI API (Tertiary Backup) ───────────────────────────────
    if (items.length === 0 && process.env.OPENAI_API_KEY) {
      try {
        console.log("[detect] Switching to OpenAI GPT-4o-mini Vision backup...");
        items = await detectWithOpenAI(req.file.path);
        engineUsed = "OpenAI GPT-4o-mini";
      } catch (oaiErr) {
        openAiError = oaiErr;
        console.error("[detect] OpenAI Fallback failed:", oaiErr.message || oaiErr);
      }
    }
  }

  // Clean up temp upload file
  if (req.file && fs.existsSync(req.file.path)) {
    try { fs.unlinkSync(req.file.path); } catch (_) { /* ignore */ }
  }

  // ── All providers failed — return descriptive error ─────────────────────
  if (items.length === 0) {
    const isRateLimit = (geminiError?.message || "").includes("429") || (geminiError?.message || "").toLowerCase().includes("quota");

    if (isRateLimit && !process.env.GROQ_API_KEY && !process.env.OPENAI_API_KEY) {
      return res.status(429).json({
        error: "Gemini API limit reached. Please set GROQ_API_KEY in server/.env for automatic backup!",
      });
    }

    return res.status(500).json({
      error: `Detection failed across providers: Gemini: ${geminiError?.message || "Error"} | Groq: ${groqError?.message || "Not configured"} | OpenAI: ${openAiError?.message || "Not configured"}`,
    });
  }

  // ── Separate fresh vs spoiled ──────────────────────────────────────────
  const freshItems = items.filter((i) => !i.isSpoiled);
  const spoiledItems = items.filter((i) => i.isSpoiled);

  // ── Auto-save fresh ingredients to the user's pantry ──────────────────
  let savedIngredients = [];
  try {
    const pantryRecords = freshItems.map(toPantryRecord);
    const saved = await Ingredient.upsertMany(req.userId, pantryRecords);
    savedIngredients = saved.map(withComputedStatus);
  } catch (saveErr) {
    console.error("[detect] Failed to save to pantry:", saveErr.message);
  }

  // ── Return full response ──────────────────────────────────────────────
  res.json({
    items,
    spoiled: spoiledItems.map((s) => ({ name: s.name, reason: s.spoiledReason || "" })),
    ingredients: freshItems.map((i) => i.name),
    fresh: freshItems,
    savedCount: savedIngredients.length,
    saved: savedIngredients,
    totalDetected: items.length,
    detected: items,
    engine: engineUsed,
  });
});

export default router;
