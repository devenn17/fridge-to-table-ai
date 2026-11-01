import express from "express";
import { runScan } from "../utils/scanEngine.js";
import * as Ingredient from "../models/Ingredient.js";
import { withComputedStatus } from "../utils/shelfLife.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

/**
 * POST /api/scan
 *
 * Runs a scan of the single fixed reference fridge image. No image bytes
 * are actually analyzed - this demo is scoped to exactly one photo, so the
 * catalog of detectable ingredients is fixed (see data/fridgeCatalog.js).
 * Every call re-rolls which 1-2 items (from a small candidate pool) come
 * back spoiled, and generates fresh random expiry dates for everything
 * that gets auto-saved to the caller's pantry.
 */
router.post("/", requireAuth, async (req, res) => {
  try {
    const result = runScan();

    const saved = await Ingredient.upsertMany(req.userId, result.healthy);
    const savedWithStatus = saved.map(withComputedStatus);

    res.json({
      scannedAt: result.scannedAt,
      totalDetected: result.totalDetected,
      detected: result.detected,
      spoiled: result.spoiled,
      savedCount: saved.length,
      saved: savedWithStatus,
    });
  } catch (err) {
    console.error("Scan error:", err);
    res.status(500).json({ message: "Scan failed" });
  }
});

export default router;
