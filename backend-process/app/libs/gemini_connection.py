import os
from langchain_google_genai import ChatGoogleGenerativeAI

try:
    GeminiConnection = ChatGoogleGenerativeAI(
        model = os.getenv("MODEL_NAME")
    )
except Exception as e:
    print(f"Something went wrong in gemini connection.. {e}")