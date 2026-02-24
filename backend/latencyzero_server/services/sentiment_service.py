"""
Sentiment analysis service using HuggingFace Transformers pipeline.
Model: lxyuan/distilbert-base-multilingual-cased-sentiments-student
Labels: positive, neutral, negative  (multilingual, works with Spanish)
"""
from typing import Tuple
from transformers import pipeline

_sentiment_pipeline = None


def _get_pipeline():
    global _sentiment_pipeline
    if _sentiment_pipeline is None:
        _sentiment_pipeline = pipeline(
            "text-classification",
            model="lxyuan/distilbert-base-multilingual-cased-sentiments-student",
            top_k=1,
        )
    return _sentiment_pipeline


def analyze_sentiment(text: str) -> Tuple[str, float]:
    """
    Returns (label, score) where label is 'positive', 'neutral' or 'negative'.
    Truncates input to 512 chars to avoid tokeniser overflow.
    """
    pipe = _get_pipeline()
    result = pipe(text[:512])
    # result looks like: [[{'label': 'positive', 'score': 0.98}]]
    top = result[0][0] if isinstance(result[0], list) else result[0]
    return top["label"].lower(), float(top["score"])
