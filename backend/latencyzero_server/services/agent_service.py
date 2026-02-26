import requests
from ..core.config import settings

GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

def ask_groq(messages):

    if not settings.GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY no configurada")

    headers = {
        "Authorization": f"Bearer {settings.GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": messages,
        "temperature": 0.6
    }

    response = requests.post(GROQ_URL, headers=headers, json=data, timeout=30)
    response.raise_for_status()

    return response.json()["choices"][0]["message"]["content"]