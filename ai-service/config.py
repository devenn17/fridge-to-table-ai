import os

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# yolov8m-worldv2 = best speed/accuracy balance for CPU/GPU with an open
# vocabulary. Use yolov8s-worldv2.pt on CPU-only/low-memory deployments, or
# yolov8l-worldv2.pt if a GPU is available and you want higher accuracy.
MODEL_NAME = os.getenv("DETECTION_MODEL", "yolov8s-worldv2.pt")

# Primary confidence — tuned for high recall on fridge scans without
# drowning the merge step in noise now that the full vocabulary (150+
# prompts) is scored in a single pass.
# Primary confidence — tuned for high precision & recall on fridge scans
CONF_THRESHOLD = float(os.getenv("CONF_THRESHOLD", "0.35"))

# Second pass uses a slightly lower threshold for small/overlapping items
CONF_THRESHOLD_LOW = float(os.getenv("CONF_THRESHOLD_LOW", "0.25"))

# IoU for merging duplicate detections of the SAME canonical name
NMS_IOU = float(os.getenv("NMS_IOU", "0.40"))

# IoU for collapsing boxes with DIFFERENT names that almost certainly are the
# same physical object
CROSS_NAME_IOU = float(os.getenv("CROSS_NAME_IOU", "0.50"))

# Inference sizes — multi-scale improves small-object recall
INFERENCE_SIZES = [640, 960]

# Max detections per image per pass
MAX_DET = 50

# Downscale very large uploads (12MP+ phone photos) before inference; purely
# a speed optimization, no accuracy loss at typical fridge-photo distances.
MAX_IMAGE_DIM = int(os.getenv("MAX_IMAGE_DIM", "1600"))

# --- CLIP refinement -------------------------------------------------------
ENABLE_CLIP_REFINEMENT = os.getenv("ENABLE_CLIP_REFINEMENT", "false").lower() == "true"
CLIP_MODEL_NAME = os.getenv("CLIP_MODEL_NAME", "openai/clip-vit-base-patch32")
CLIP_MIN_CONF = float(os.getenv("CLIP_MIN_CONF", "0.25"))
# CLIP must beat YOLO's confidence by this margin before it's allowed to
# override the detector's label (prevents CLIP from flip-flopping labels on
# genuinely ambiguous crops).
CLIP_OVERRIDE_MARGIN = float(os.getenv("CLIP_OVERRIDE_MARGIN", "0.10"))

FLASK_HOST = os.getenv("FLASK_HOST", "0.0.0.0")
FLASK_PORT = int(os.getenv("FLASK_PORT", "5001"))
FLASK_DEBUG = os.getenv("FLASK_DEBUG", "false").lower() == "true"