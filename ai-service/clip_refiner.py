"""Optional CLIP-based crop re-classification to refine YOLO-World detections.

YOLO-World localizes objects well but, as a detector, can mislabel
visually-similar packaged goods. This module crops each detected box and
scores it with CLIP zero-shot against the full food vocabulary, then either
confirms/boosts the existing label or overrides it when CLIP is
significantly more confident.

Best-effort: if `torch`/`transformers` aren't installed, or the model can't
be downloaded, refinement is silently disabled and the detector falls back
to raw YOLO-World output.
"""

import functools
from typing import Optional

from PIL import Image

import config
from food_vocabulary import CANONICAL_MAP

_CLIP_AVAILABLE = True
try:
    import torch
    from transformers import CLIPModel, CLIPProcessor
except Exception:
    _CLIP_AVAILABLE = False


class ClipRefiner:
    """Wraps a CLIP model for zero-shot re-scoring of detection crops."""

    def __init__(self):
        self.enabled = _CLIP_AVAILABLE and config.ENABLE_CLIP_REFINEMENT
        self.model = None
        self.processor = None
        self.device = "cpu"

        self._labels = sorted({meta["name"] for meta in CANONICAL_MAP.values()})
        self._label_to_category = {}
        for meta in CANONICAL_MAP.values():
            self._label_to_category.setdefault(meta["name"], meta["category"])
        self._text_prompts = [f"a photo of {label}, a refrigerator food item" for label in self._labels]
        self._text_features = None

        if not self.enabled:
            return

        try:
            self.device = "cuda" if torch.cuda.is_available() else "cpu"
            print(f"[clip] Loading {config.CLIP_MODEL_NAME} on {self.device} …")
            self.model = CLIPModel.from_pretrained(config.CLIP_MODEL_NAME).to(self.device)
            self.model.eval()
            self.processor = CLIPProcessor.from_pretrained(config.CLIP_MODEL_NAME)
            with torch.no_grad():
                text_inputs = self.processor(
                    text=self._text_prompts, return_tensors="pt", padding=True
                ).to(self.device)
                features = self.model.get_text_features(**text_inputs)
                self._text_features = features / features.norm(dim=-1, keepdim=True)
            print("[clip] Ready.")
        except Exception as exc:
            print(f"[clip] Disabled — could not load model: {exc}")
            self.enabled = False

    def _crop(self, image: Image.Image, bbox: list) -> Optional[Image.Image]:
        x1, y1, x2, y2 = [max(0, v) for v in bbox]
        x2 = min(x2, image.width)
        y2 = min(y2, image.height)
        if x2 - x1 < 8 or y2 - y1 < 8:
            return None
        return image.crop((x1, y1, x2, y2))

    def refine(self, image_path: str, detections: list) -> list:
        if not self.enabled or not detections:
            return detections

        try:
            image = Image.open(image_path).convert("RGB")
        except Exception as exc:
            print(f"[clip] Could not open image for refinement: {exc}")
            return detections

        crops, indices = [], []
        for i, det in enumerate(detections):
            crop = self._crop(image, det["bbox"])
            if crop is not None:
                crops.append(crop)
                indices.append(i)

        if not crops:
            return detections

        try:
            with torch.no_grad():
                inputs = self.processor(images=crops, return_tensors="pt").to(self.device)
                image_features = self.model.get_image_features(**inputs)
                image_features = image_features / image_features.norm(dim=-1, keepdim=True)
                similarity = (image_features @ self._text_features.T).softmax(dim=-1)
                top_scores, top_idx = similarity.max(dim=-1)
        except Exception as exc:
            print(f"[clip] Refinement pass failed, keeping raw detections: {exc}")
            return detections

        for pos, det_idx in enumerate(indices):
            det = detections[det_idx]
            clip_label = self._labels[top_idx[pos].item()]
            clip_conf = float(top_scores[pos].item())

            if clip_label == det["name"]:
                det["confidence"] = round(min(1.0, det["confidence"] * 0.6 + clip_conf * 0.4), 3)
                continue

            if clip_conf >= det["confidence"] + config.CLIP_OVERRIDE_MARGIN and clip_conf >= config.CLIP_MIN_CONF:
                det["name"] = clip_label
                det["category"] = self._label_to_category.get(clip_label, det["category"])
                det["confidence"] = round(clip_conf, 3)

        return detections


@functools.lru_cache(maxsize=1)
def get_refiner() -> "ClipRefiner":
    return ClipRefiner()