import  os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = os.getenv("PORT")
    GOOGLE_API_KEY= os.getenv("GOOGLE_API_KEY")
    MODEL_NAME= os.getenv("MODEL_NAME")
    AWS_ORIGIN= os.getenv("AWS_ORIGIN")
    AWS_ACCESS_KEY_ID = os.getenv("AWS_ACCESS_KEY_ID")
    AWS_SECRET_ACCESS_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")

class DevelopmentConfig(Config):
    DEBUG=True

class ProductionConfig(Config):
    DEBUG=False