"""Post-processing: same-name NMS, cross-name duplicate collapsing, result
merging, and color-based spoilage heuristics."""

import cv2
import numpy as np

import config
from food_vocabulary import normalize_detection


# ---------------------------------------------------------------------------
# IoU helpers
# ---------------------------------------------------------------------------

def iou(box_a: list, box_b: list) -> float:
    x1 = max(box_a[0], box_b[0])
    y1 = max(box_a[1], box_b[1])
    x2 = min(box_a[2], box_b[2])
    y2 = min(box_a[3], box_b[3])

    inter = max(0, x2 - x1) * max(0, y2 - y1)
    if inter == 0:
        return 0.0

    area_a = (box_a[2] - box_a[0]) * (box_a[3] - box_a[1])
    area_b = (box_b[2] - box_b[0]) * (box_b[3] - box_b[1])
    union = area_a + area_b - inter
    return inter / union if union > 0 else 0.0


# ---------------------------------------------------------------------------
# NMS / merge helpers
# ---------------------------------------------------------------------------

def _dedup_same_name(detections: list, iou_threshold: float) -> list:
    """Merge duplicate detections that share the SAME canonical name."""
    if not detections:
        return []

    by_name = {}
    for det in detections:
        by_name.setdefault(det["name"], []).append(det)

    kept = []
    for _name, group in by_name.items():
        group.sort(key=lambda d: d["confidence"], reverse=True)
        survivors = []
        for det in group:
            duplicate = False
            for existing in survivors:
                if iou(det["bbox"], existing["bbox"]) >= iou_threshold:
                    duplicate = True
                    break
            if not duplicate:
                survivors.append(det.copy())
        kept.extend(survivors)
    return kept


def _dedup_cross_name(detections: list, iou_threshold: float) -> list:
    """Collapse boxes with DIFFERENT names but near-identical geometry —
    very likely the same physical object. Keeps the higher-confidence label."""
    if not detections:
        return []

    sorted_dets = sorted(detections, key=lambda d: d["confidence"], reverse=True)
    kept = []

    for det in sorted_dets:
        duplicate = False
        for existing in kept:
            if iou(det["bbox"], existing["bbox"]) >= iou_threshold:
                duplicate = True
                break
        if not duplicate:
            kept.append(det.copy())

    return kept


def merge_pass_results(all_pass_results: list, iou_threshold: float = None,
                        cross_name_iou: float = None) -> list:
    """Combine results from multiple detection passes and scales."""
    iou_threshold = config.NMS_IOU if iou_threshold is None else iou_threshold
    cross_name_iou = config.CROSS_NAME_IOU if cross_name_iou is None else cross_name_iou

    flat = []
    for batch in all_pass_results:
        flat.extend(batch)

    same_name_merged = _dedup_same_name(flat, iou_threshold)
    return _dedup_cross_name(same_name_merged, cross_name_iou)


# ---------------------------------------------------------------------------
# Color-based spoilage heuristics
# ---------------------------------------------------------------------------

# Categories eligible for visual spoilage analysis
_SPOILABLE = {
    "Vegetable", "Fruit", "Meat", "Seafood", "Dairy", "Egg", "Bakery", "Other"
}

# HSV ranges for mold / rot colors (H in [0,179] for cv2)
# Format: (h_lo, h_hi, s_lo, s_hi, v_lo, v_hi)
_MOLD_RANGES = [
    # Green mold: hue 35–85, moderate-high saturation, moderate value
    (35, 85, 50, 255, 30, 200),
    # Black mold / rot: any hue, low saturation, very low value
    (0, 179, 0, 60, 0, 50),
    # Blue-grey mold: hue 85–130, moderate saturation
    (85, 130, 40, 255, 30, 180),
]

# HSV ranges that indicate fresh / healthy colors (used to reduce false positives)
_FRESH_GREEN_RANGE = (35, 85, 60, 255, 60, 255)   # bright healthy green


def _hsv_mask_ratio(hsv: np.ndarray, h_lo, h_hi, s_lo, s_hi, v_lo, v_hi) -> float:
    """Fraction of pixels in `hsv` that fall within the given HSV bounds."""
    mask = (
        (hsv[:, :, 0] >= h_lo) & (hsv[:, :, 0] <= h_hi) &
        (hsv[:, :, 1] >= s_lo) & (hsv[:, :, 1] <= s_hi) &
        (hsv[:, :, 2] >= v_lo) & (hsv[:, :, 2] <= v_hi)
    )
    return float(mask.sum()) / max(hsv.shape[0] * hsv.shape[1], 1)


def _is_fresh_green_dominant(hsv: np.ndarray) -> bool:
    """True if the crop is predominantly a healthy bright green — avoids
    flagging spinach, broccoli, or cucumber as mouldy."""
    h_lo, h_hi, s_lo, s_hi, v_lo, v_hi = _FRESH_GREEN_RANGE
    ratio = _hsv_mask_ratio(hsv, h_lo, h_hi, s_lo, s_hi, v_lo, v_hi)
    return ratio > 0.35


def _check_white_mold(hsv: np.ndarray, category: str = "") -> tuple[bool, str]:
    """Detect white or pale grey fuzzy mold patches (e.g. on tomatoes, berries, bread)."""
    # High value (bright/white), low saturation (grey/pale white)
    mask = (hsv[:, :, 1] <= 45) & (hsv[:, :, 2] >= 170)
    ratio = float(mask.sum()) / max(hsv.shape[0] * hsv.shape[1], 1)
    # White mold stands out on non-white items (red tomatoes, dark berries, green veg)
    if ratio > 0.15:
        return True, "Fuzzy white mold patches detected on the surface"
    return False, ""


def _check_dark_rot(hsv: np.ndarray, category: str = "") -> tuple[bool, str]:
    """Detect dark rotten spots (e.g. on watermelon, broccoli, tomatoes)."""
    # Dark spot: low value (brightness <= 60), moderate saturation (25-180)
    mask = (hsv[:, :, 1] >= 25) & (hsv[:, :, 1] <= 180) & (hsv[:, :, 2] <= 60)
    ratio = float(mask.sum()) / max(hsv.shape[0] * hsv.shape[1], 1)
    if ratio > 0.18:
        return True, "Dark rot or black spot defect detected"
    return False, ""


def _check_brown_rot(hsv: np.ndarray, category: str = "") -> tuple[bool, str]:
    """Detect brown/dark rot that is common in overripe fruit and veg."""
    # Brown: hue 5-25, moderate sat, low-mid value
    ratio = _hsv_mask_ratio(hsv, 5, 25, 40, 200, 20, 130)
    if ratio > 0.25:
        return True, "Brown rot or dark discoloration detected on the surface"
    return False, ""


def _check_mold(hsv: np.ndarray, is_fresh_green: bool, category: str = "") -> tuple[bool, str]:
    """Detect mold patches (green, black, blue)."""
    for i, (h_lo, h_hi, s_lo, s_hi, v_lo, v_hi) in enumerate(_MOLD_RANGES):
        # i == 0: Green mold — run on non-green items (red tomatoes, watermelon, paneer, bread)
        if i == 0:
            if is_fresh_green:
                continue
            ratio = _hsv_mask_ratio(hsv, h_lo, h_hi, s_lo, s_hi, v_lo, v_hi)
            if ratio > 0.18:
                return True, "Green mold patches detected on the surface"
        # i == 1: Black mold / severe rot
        elif i == 1:
            mask = (hsv[:, :, 1] >= 30) & (hsv[:, :, 2] <= 55)
            ratio = float(mask.sum()) / max(hsv.shape[0] * hsv.shape[1], 1)
            if ratio > 0.20:
                return True, "Black mold or severe rot detected"
        # i == 2: Blue-grey mold
        elif i == 2:
            ratio = _hsv_mask_ratio(hsv, h_lo, h_hi, s_lo, s_hi, v_lo, v_hi)
            if ratio > 0.20:
                return True, "Blue-grey mold detected"
    return False, ""


def analyze_spoilage(image_bgr: np.ndarray, bbox: list, category: str, confidence: float = 0.5) -> tuple[bool, str]:
    """Analyze a single bounding-box crop for visual spoilage signs.

    Returns (isSpoiled, reason).  Falls back to (False, "") on any error so
    that a bad crop never crashes the detection pipeline.
    """
    if category not in _SPOILABLE or confidence < 0.20:
        return False, ""

    try:
        x1, y1, x2, y2 = [int(round(v)) for v in bbox]
        h, w = image_bgr.shape[:2]
        # Inset crop by 10% to avoid extreme shelf border shadows
        bw = x2 - x1
        bh = y2 - y1
        if bw < 15 or bh < 15:
            return False, ""

        pad_w = int(bw * 0.10)
        pad_h = int(bh * 0.10)

        x1_in = max(0, x1 + pad_w)
        y1_in = max(0, y1 + pad_h)
        x2_in = min(w, x2 - pad_w)
        y2_in = min(h, y2 - pad_h)

        if x2_in <= x1_in or y2_in <= y1_in:
            return False, ""

        crop = image_bgr[y1_in:y2_in, x1_in:x2_in]
        hsv = cv2.cvtColor(crop, cv2.COLOR_BGR2HSV)

        is_fresh_green = _is_fresh_green_dominant(hsv)

        spoiled, reason = _check_white_mold(hsv, category)
        if spoiled:
            return True, reason

        spoiled, reason = _check_dark_rot(hsv, category)
        if spoiled:
            return True, reason

        spoiled, reason = _check_mold(hsv, is_fresh_green, category)
        if spoiled:
            return True, reason

        spoiled, reason = _check_brown_rot(hsv, category)
        if spoiled:
            return True, reason

        return False, ""

    except Exception as exc:
        print(f"[spoilage] analysis error for {category} crop: {exc}")
        return False, ""


# ---------------------------------------------------------------------------
# Item builder
# ---------------------------------------------------------------------------

def raw_box_to_item(label: str, confidence: float, bbox: list,
                    image_bgr: np.ndarray = None) -> dict | None:
    """Convert a raw YOLO detection into a normalized item dict.

    Optionally accepts the source image array so that the spoilage
    heuristic can inspect the bounding-box crop.
    """
    if confidence < 0.20:
        return None

    normalized = normalize_detection(label)
    category = normalized["category"]

    is_spoiled = False
    spoiled_reason = ""

    if image_bgr is not None and confidence >= 0.20:
        is_spoiled, spoiled_reason = analyze_spoilage(image_bgr, bbox, category, confidence)

    return {
        "name": normalized["name"],
        "category": category,
        "confidence": round(float(confidence), 3),
        "bbox": [round(float(v), 1) for v in bbox],
        "isSpoiled": is_spoiled,
        "spoiledReason": spoiled_reason,
    }


def to_api_response(items: list, model_name: str = None) -> dict:
    """Format final detection output for the Express API."""
    unique_names = sorted({item["name"] for item in items})
    return {
        "items": items,
        "ingredients": unique_names,
        "count": len(items),
        "model": model_name or config.MODEL_NAME,
    }