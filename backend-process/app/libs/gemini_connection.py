import os
from langchain_google_genai import ChatGoogleGenerativeAI

def GeminiConnection():
    """
    Create and return a Gemini LLM connection instance
    """
    try:
        return ChatGoogleGenerativeAI(
            model = os.getenv("MODEL_NAME")
        )
    except Exception as e:
        print(f"Something went wrong in gemini connection.. {e}")
        raise e