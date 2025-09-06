from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__, url_prefix="/")

@health_bp.route("/", methods = ["POST", "GET", "PUT", "PATCH"])
def health_checker():
    return jsonify({
        'message' : 'Backend is healthy'
    }), 200