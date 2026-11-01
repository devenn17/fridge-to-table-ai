"""Open-vocabulary fridge detection: YOLO-World for localization, optional
CLIP re-scoring for fine-grained classification, and color-based spoilage
heuristics applied to every bounding-box crop."""

import os
import time

import cv2
import numpy as np
from ultralytics import YOLO

import config
from food_vocabulary import ALL_PROMPTS
from postprocessor import merge_pass_results, raw_box_to_item
from preprocessor import enhance_image, resize_if_needed, save_enhanced


class FridgeDetector:
    def __init__(self):
        print(f"[detector] Loading {config.MODEL_NAME} …")
        self.model = YOLO(config.MODEL_NAME)

        # Text embeddings for the WHOLE vocabulary are computed ONCE here,
        # not per-request. The previous implementation called
        # `set_classes()` inside every single one of ~25 passes per image —
        # this was the biggest hidden cost in the old pipeline.
        self.model.set_classes(ALL_PROMPTS)
        self._warmup()
        print(f"[detector] Model ready with {len(ALL_PROMPTS)} vocabulary prompts.")

        self.clip_refiner = None
        if config.ENABLE_CLIP_REFINEMENT:
            from clip_refiner import get_refiner
            self.clip_refiner = get_refiner()

    def _warmup(self):
        dummy = np.zeros((640, 640, 3), dtype=np.uint8)
        try:
            self.model.predict(dummy, imgsz=320, verbose=False, conf=0.5)
        except Exception as exc:
            print(f"[detector] Warmup skipped: {exc}")

    def _run_pass(self, image_source, conf: float, imgsz: int,
                  image_bgr: np.ndarray = None) -> list:
        """Run a single YOLO inference pass.

        `image_bgr` is the source image array used for spoilage color
        analysis on each detected crop.  When None the heuristic is skipped
        (e.g. when the source is already a numpy array / path inconsistency).
        """
        results = self.model.predict(
            image_source,
            imgsz=imgsz,
            conf=conf,
            iou=config.NMS_IOU,
            max_det=config.MAX_DET,
            verbose=False,
            augment=True,
        )

        detections = []
        for result in results:
            if result.boxes is None:
                continue
            names = result.names
            for box in result.boxes:
                cls_id = int(box.cls)
                label = names.get(cls_id, ALL_PROMPTS[cls_id] if cls_id < len(ALL_PROMPTS) else "unknown")
                item = raw_box_to_item(
                    label,
                    float(box.conf),
                    box.xyxy[0].tolist(),
                    image_bgr=image_bgr,
                )
                if item:
                    detections.append(item)
        return detections

    def detect(self, image_path: str) -> dict:
        start = time.perf_counter()

        working_path = resize_if_needed(image_path, config.MAX_IMAGE_DIM)
        enhanced_path = working_path + "._enhanced.jpg"
        save_enhanced(enhance_image(working_path), enhanced_path)

        # Load the working image once for spoilage crop analysis
        working_bgr = cv2.imread(working_path)
        enhanced_bgr = cv2.imread(enhanced_path)

        # One combined-vocabulary pass at two scales on the enhanced image,
        # plus one pass on the raw original — replaces the old 5-category x
        # 2-scale x 2-threshold x (+original) = ~25 forward passes with 3.
        all_batches = [
            self._run_pass(enhanced_path, config.CONF_THRESHOLD,
                           config.INFERENCE_SIZES[0], image_bgr=enhanced_bgr),
            self._run_pass(enhanced_path, config.CONF_THRESHOLD_LOW,
                           config.INFERENCE_SIZES[1], image_bgr=enhanced_bgr),
            self._run_pass(working_path, config.CONF_THRESHOLD,
                           config.INFERENCE_SIZES[0], image_bgr=working_bgr),
        ]

        final = merge_pass_results(all_batches, config.NMS_IOU, config.CROSS_NAME_IOU)

        if self.clip_refiner is not None:
            final = self.clip_refiner.refine(working_path, final)
            # CLIP may relabel two separate boxes to the same canonical
            # name, or resolve two labels to the same physical object —
            # collapse once more after refinement.
            final = merge_pass_results([final], config.NMS_IOU, config.CROSS_NAME_IOU)

        if os.path.exists(enhanced_path):
            os.remove(enhanced_path)
        if working_path != image_path and os.path.exists(working_path):
            os.remove(working_path)

        elapsed_ms = round((time.perf_counter() - start) * 1000)

        spoiled_items = [d for d in final if d.get("isSpoiled")]
        print(f"[detector] Found {len(final)} items "
              f"({len(spoiled_items)} spoiled) in {elapsed_ms}ms")

        return {
            "items": final,
            "ingredients": sorted({d["name"] for d in final if not d.get("isSpoiled")}),
            "spoiled": [d["name"] for d in spoiled_items],
            "count": len(final),
            "model": config.MODEL_NAME,
            "inference_ms": elapsed_ms,
        }


_detector = None


def get_detector() -> FridgeDetector:
    global _detector
    if _detector is None:
        _detector = FridgeDetector()
    return _detector