import { FRIDGE_CATALOG, SPOILED_CANDIDATES } from "../data/fridgeCatalog.js";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr, count) {
  const pool = [...arr];
  const picked = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = randomInt(0, pool.length - 1);
    picked.push(pool.splice(idx, 1)[0]);
  }
  return picked;
}

function randomConfidence() {
  return Math.round((92 + Math.random() * 7.9) * 10) / 10; // 92.0 - 99.9
}

function shelfLifeDaysFor(item) {
  const [min, max] = item.shelfLifeRange || [7, 7];
  return randomInt(min, max);
}

function expiresAtFor(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}

/**
 * Runs one "scan" of the fixed reference fridge image.
 *
 * Always detects the full predefined catalog. Randomly marks 1 or 2 of the
 * eligible candidates as spoiled (never all of them, never zero on repeat
 * scans being guaranteed the same set - it's re-rolled every time).
 */
export function runScan() {
  const spoiledCount = Math.random() < 0.5 ? 1 : 2;
  const chosenCandidates = pickRandom(SPOILED_CANDIDATES, spoiledCount);
  const spoiledNames = new Set(chosenCandidates.map((c) => c.name));

  const spoiled = chosenCandidates.map((c) => {
    const catalogItem = FRIDGE_CATALOG.find((i) => i.name === c.name);
    const reason = c.reasons[randomInt(0, c.reasons.length - 1)];
    return {
      name: catalogItem.name,
      label: catalogItem.label,
      category: catalogItem.category,
      icon: catalogItem.icon,
      quantity: catalogItem.quantity,
      unit: catalogItem.unit,
      reason,
      isSpoiled: true,
    };
  });

  const detected = FRIDGE_CATALOG.map((item) => {
    const isSpoiled = spoiledNames.has(item.name);
    return {
      name: item.name,
      label: item.label,
      category: item.category,
      icon: item.icon,
      quantity: item.quantity,
      unit: item.unit,
      confidence: randomConfidence(),
      isSpoiled,
    };
  });

  const healthy = FRIDGE_CATALOG.filter((item) => !spoiledNames.has(item.name)).map(
    (item) => {
      const shelfLifeDays = shelfLifeDaysFor(item);
      return {
        name: item.name,
        label: item.label,
        category: item.category,
        icon: item.icon,
        quantity: item.quantity,
        unit: item.unit,
        shelfLifeDays,
        expiresAt: expiresAtFor(shelfLifeDays),
      };
    }
  );

  return {
    scannedAt: new Date().toISOString(),
    totalDetected: detected.length,
    detected,
    spoiled,
    healthy,
  };
}
