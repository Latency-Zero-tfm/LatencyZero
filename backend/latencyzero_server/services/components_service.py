import io
import os
import cv2
import numpy as np
import torch
from PIL import Image
from tensorflow.keras.models import load_model
from transformers import CLIPProcessor, CLIPModel
import easyocr
from typing import Dict, Any, List

from ..utils.components_labels import LABEL_MAP, TRANSLATION_MAP, COMPONENT_LABELS, JUNK_LABELS
from ..schemas.component import ComponentDTO

_model = None
_reader = None
_clip_model = None
_clip_processor = None

def init_service(model_path: str = None, ocr_langs: List[str] = ["en"], use_gpu: bool = False):
  global _model, _reader, _clip_model, _clip_processor
  if _model is None:
    if model_path is None:
      base = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
      model_path = os.path.join(base, "ml", "components_pc_model.keras")
    _model = load_model(model_path)
  if _reader is None:
    _reader = easyocr.Reader(ocr_langs, gpu=use_gpu)
  if _clip_model is None:
    model_id = "openai/clip-vit-base-patch32"
    _clip_model = CLIPModel.from_pretrained(model_id)
    _clip_processor = CLIPProcessor.from_pretrained(model_id)


def _process_image_bytes(image_bytes: bytes):
  try:
    arr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if img is None:
      return None, None, None

    img_resized = cv2.resize(img, (230, 230))
    img_gray = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)
    img_array = img_gray.astype("float32") / 255.0
    img_processed = np.expand_dims(img_array, axis=0)
    img_processed = np.expand_dims(img_processed, axis=-1)

    ocr_img = cv2.cvtColor(img_resized, cv2.COLOR_BGR2RGB)
    
    # Para CLIP, retornar imagen PIL
    clip_img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    
    return img_processed, ocr_img, clip_img
  except Exception:
    return None, None, None


def _filter_image_with_clip(image: Image.Image, threshold: float = 0.6) -> bool:
  global _clip_model, _clip_processor
  
  if _clip_model is None or _clip_processor is None:
    init_service()
  
  try:
    all_labels = COMPONENT_LABELS + JUNK_LABELS
    
    inputs = _clip_processor(text=all_labels, images=image, return_tensors="pt", padding=True)
    
    with torch.no_grad():
      outputs = _clip_model(**inputs)
    
    probs = outputs.logits_per_image.softmax(dim=1)[0]
    
    prob_total_componente = sum(probs[:len(COMPONENT_LABELS)]).item()
    
    prob_total_junk = sum(probs[len(COMPONENT_LABELS):]).item()
    
    idx_max = torch.argmax(probs).item()
    winner = all_labels[idx_max]
    prob_winner = probs[idx_max].item()
    
    is_valid = (prob_total_componente > threshold 
                and winner in COMPONENT_LABELS 
                and prob_winner > 0.15)
    
    return is_valid
  except Exception:
    return False


def predict_from_bytes(image_bytes: bytes) -> ComponentDTO:
  global _model, _reader
  try:
        if _model is None or _reader is None:
            init_service()

        processed_img, ocr_img, clip_img = _process_image_bytes(image_bytes)
        if processed_img is None:
            return ComponentDTO(error="invalid_image", message="No se pudo procesar la imagen")

        # Filtrado inicial: verificar si es un componente
        if not _filter_image_with_clip(clip_img, threshold=0.65):
            return ComponentDTO(error="not_a_component", message="La imagen no parece ser un componente de PC")

        # OCR
        try:
            ocr_results = _reader.readtext(ocr_img, detail=0)
        except Exception:
            ocr_results = []

        ocr_upper = [t.upper() for t in ocr_results]

        # Predicción
        preds = _model.predict(processed_img)
        confidences = preds[0].astype(float).tolist()
        predicted_index = int(np.argmax(confidences))
        predicted_label = LABEL_MAP.get(predicted_index, "unknown")
        predicted_label_es = TRANSLATION_MAP.get(predicted_label, predicted_label)

        # Mapa de confidencias por etiqueta
        confidences_map = {LABEL_MAP[i]: float(confidences[i]) for i in range(len(confidences))}

        # Deteccion de marca para CPU
        brand = None
        if predicted_label == "cpu":
            if any("INTEL" in t for t in ocr_upper):
                brand = "INTEL"
            elif any("AMD" in t for t in ocr_upper):
                brand = "AMD"

        return ComponentDTO(
            predicted_label=predicted_label,
            predicted_label_es=predicted_label_es,
            predicted_index=predicted_index,
            confidences=confidences_map,
            ocr=ocr_results,
            brand=brand,
            error=None,
            message=None,
        )

  except Exception as e:
    return ComponentDTO(error="exception", message=str(e))


if __name__ == "__main__":
  sample_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "seeds", "example.jpg"))
  if os.path.exists(sample_path):
    with open(sample_path, "rb") as f:
      res = predict_from_bytes(f.read())
      print(res)