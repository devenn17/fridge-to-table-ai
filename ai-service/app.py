"""Flask API for Fridge-to-Table food detection."""

import os
import uuid

from flask import Flask, jsonify, request
from werkzeug.utils import secure_filename

import config
from detector import get_detector

app = Flask(__name__)

ALLOWED = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}


@app.route("/")
def home():
    engine = "YOLO-World v2 (open vocabulary)"
    if config.ENABLE_CLIP_REFINEMENT:
        engine += " + CLIP zero-shot refinement"
    return jsonify({
        "service": "Fridge-to-Table AI Detection",
        "model": config.MODEL_NAME,
        "engine": engine,
        "status": "running",
    })


@app.route("/health")
def health():
    return jsonify({"status": "ok", "model": config.MODEL_NAME})


@app.route("/detect", methods=["POST"])
def detect():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    if not file.filename:
        return jsonify({"error": "Empty filename"}), 400

    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED:
        return jsonify({"error": f"Unsupported format. Use: {', '.join(ALLOWED)}"}), 400

    filename = secure_filename(f"{uuid.uuid4().hex}{ext}")
    image_path = os.path.join(config.UPLOAD_FOLDER, filename)

    try:
        file.save(image_path)
        result = get_detector().detect(image_path)
        return jsonify(result)
    except Exception as exc:
        print(f"[detect] Error: {exc}")
        return jsonify({"error": str(exc)}), 500
    finally:
        if os.path.exists(image_path):
            os.remove(image_path)


if __name__ == "__main__":
    print(f"Starting AI service on port {config.FLASK_PORT} …")
    get_detector()
    app.run(host=config.FLASK_HOST, port=config.FLASK_PORT, debug=config.FLASK_DEBUG)

    # venv\Scripts\activate
    # pip install -r requirements.txt 1st time
    # python app.py or py app.py