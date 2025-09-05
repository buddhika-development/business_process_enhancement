import os
from flask import Flask
from dotenv import load_dotenv

from app.Config import ProductionConfig, DevelopmentConfig

load_dotenv()

config = ProductionConfig if os.getenv("FLASK_ENV") == "production" else DevelopmentConfig

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    # register the routes
    from app.route.health import health_bp
    from app.route.documentValidate import document_validate_bp

    app.register_blueprint(health_bp)
    app.register_blueprint(document_validate_bp)

    return app