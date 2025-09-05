import  os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = os.getenv("PORT")
    GOOGLE_API_KEY= os.getenv("GOOGLE_API_KEY")
    MODEL_NAME= os.getenv("MODEL_NAME")

class DevelopmentConfig(Config):
    DEBUG=True

class ProductionConfig(Config):
    DEBUG=False