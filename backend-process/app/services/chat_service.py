from app.libs.gemini_connection import GeminiConnection
from app.libs.prompt_generator.PromptTemplates.ChatBot import ChatBot

llm = GeminiConnection()

def generate_response(query, history):

    chatBot = ChatBot()
    response = chatBot.invoke(query, history)
    return {
        "content" : response
    },200