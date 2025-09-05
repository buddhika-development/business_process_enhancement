from flask import Blueprint, request, jsonify

document_validate_bp = Blueprint("document_validate", __name__, url_prefix="/api/document-validate")

@document_validate_bp.route("/", methods = ["GET", "POST", "PUT", "PATCH"])
def document_validator_health():
    return jsonify({
        'message' : 'Document validator route is healthy'
    }), 200


# gramasewaka document validator
@document_validate_bp.route("/gnc", methods = ["POST"])
def gramasewaka_certificate_validate():

    gramasewaka_certificate_file = request.files["gnc"]
    
    return jsonify({
        'message' : "Gramasewaka document validation"
    }),200