"""Image preprocessing for improved detection under varied lighting."""

import os

import cv2
import numpy as np


def resize_if_needed(image_path: str, max_dim: int) -> str:
    """Downscale very large phone photos before inference.

    Big images (12MP+) slow down every inference pass with no accuracy
    benefit once past the model's working resolution. Returns a path to a
    resized copy, or the original path if no resize was needed.
    """
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Could not read image: {image_path}")

    h, w = img.shape[:2]
    longest = max(h, w)
    if longest <= max_dim:
        return image_path

    scale = max_dim / longest
    resized = cv2.resize(img, (round(w * scale), round(h * scale)), interpolation=cv2.INTER_AREA)

    root, ext = os.path.splitext(image_path)
    resized_path = f"{root}._resized{ext}"
    cv2.imwrite(resized_path, resized)
    return resized_path


def enhance_image(image_path: str) -> np.ndarray:
    """Apply gamma correction + CLAHE + sharpening to improve low-light,
    flat, or harsh-fridge-light images."""
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Could not read image: {image_path}")

    img = _auto_gamma(img)

    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l_channel, a, b = cv2.split(lab)

    clahe = cv2.createCLAHE(clipLimit=2.5, tileGridSize=(8, 8))
    l_enhanced = clahe.apply(l_channel)

    enhanced = cv2.merge([l_enhanced, a, b])
    enhanced = cv2.cvtColor(enhanced, cv2.COLOR_LAB2BGR)

    # Unsharp mask for edge clarity (helps small/partial objects)
    blurred = cv2.GaussianBlur(enhanced, (0, 0), sigmaX=1.2)
    sharpened = cv2.addWeighted(enhanced, 1.4, blurred, -0.4, 0)

    return sharpened


def _auto_gamma(img: np.ndarray) -> np.ndarray:
    """Correct very dark (fridge shadows) or very bright (interior light
    glare) images before CLAHE, which otherwise over- or under-corrects
    them."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    mean_brightness = gray.mean() / 255.0
    if 0.35 <= mean_brightness <= 0.65:
        return img

    gamma = 1.6 if mean_brightness < 0.35 else 0.7
    inv_gamma = 1.0 / gamma
    table = np.array([((i / 255.0) ** inv_gamma) * 255 for i in range(256)]).astype("uint8")
    return cv2.LUT(img, table)


def save_enhanced(image: np.ndarray, output_path: str) -> str:
    cv2.imwrite(output_path, image)
    return output_path