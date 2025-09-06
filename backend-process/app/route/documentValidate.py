from flask import Blueprint, request, jsonify

from app.utils.DocumentContentScraper import document_content_scraper
from app.utils.pdfReader import pdf_content_scraper

document_validate_bp = Blueprint("document_validate", __name__, url_prefix="/api/document-validate")

@document_validate_bp.route("/", methods = ["GET", "POST", "PUT", "PATCH"])
def document_validator_health():
    return jsonify({
        'message' : 'Document validator route is healthy'
    }), 200


# gramasewaka document validator
@document_validate_bp.route("/gnc", methods = ["POST"])
def gramasewaka_certificate_validate():
    """
        This function and route is responsible for validate the gramasewaka certificate
        :return:
    """

    try:
        gn_certificate = request.files.get("gnc")
        data = {}
        data["name"] = request.form.get("name")

        if not gn_certificate:
            return jsonify({
                "error": "No required files provided"
            }), 400

        print(gn_certificate)
        result, persist_location = document_content_scraper(
            key="gnc",
            file=gn_certificate,
            data = data,
            bucket_name="gramanilaradi-certificate"
        )

        # Convert Pydantic model to dict for JSON serialization
        if hasattr(result, 'dict'):
            response_data = result.dict()
        elif hasattr(result, 'model_dump'):
            response_data = result.model_dump()
        else:
            response_data = {
                "name": result.name,
                "email": result.email,
                "date": result.date
            }

        response_data["persist_location"] = persist_location

        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({
            "error": f"Processing failed: {str(e)}"
        }), 500


@document_validate_bp.route("/lease", methods=["POST"])
def lease_document_validation():
    try:
        certificate = request.files.get("lease")

        data = {}
        data["name"] = request.form.get("name")
        data["address"] = request.form.get("address")

        if not certificate:
            return jsonify({
                "error": "No required files provided"
            }), 400

        # result = documentContentScraper(gn_certificate)
        result, persist_location = document_content_scraper(
            key="lease",
            file= certificate,
            data = data,
            bucket_name= "lease-certificate"
        )

        # Convert Pydantic model to dict for JSON serialization
        if hasattr(result, 'dict'):
            response_data = result.dict()
        elif hasattr(result, 'model_dump'):
            response_data = result.model_dump()
        else:
            response_data = {
                "name": result.name,
                "email": result.email,
                "date": result.date
            }

        response_data["persist_location"] = persist_location

        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({
            "error": f"Processing failed: {str(e)}"
        }), 500


@document_validate_bp.route("/affidavit", methods=["POST"])
def affidavit_document_validation():
    try:
        certificate = request.files.get("affidavit")

        data = {}
        data["name"] = request.form.get("name")
        data["address"] = request.form.get("address")

        if not certificate:
            return jsonify({
                "error": "No required files provided"
            }), 400

        # result = documentContentScraper(gn_certificate)
        result,persist_location = document_content_scraper(
            key="affidavit",
            file=certificate,
            data = data,
            bucket_name="affidavit-certificate"
        )

        # Convert Pydantic model to dict for JSON serialization
        if hasattr(result, 'dict'):
            response_data = result.dict()
        elif hasattr(result, 'model_dump'):
            response_data = result.model_dump()
        else:
            response_data = {
                "name": result.name,
                "email": result.email,
                "date": result.date
            }

        response_data["persist_location"] = persist_location

        return jsonify(response_data), 200

    except Exception as e:
        return jsonify({
            "error": f"Processing failed: {str(e)}"
        }), 500

@document_validate_bp.route("/gnc/upload", methods=["POST"])
def gnc_testing_func():
    uploaded_file = request.files.get("file")
    if not uploaded_file:
        return jsonify({
            "success": False,
            "message": "No file received"
        }), 400

    pdf_content = pdf_content_scraper(uploaded_file)
    print("Uploaded file name:", pdf_content)

    return jsonify({
        "success": True,
        "message": f"Files received successfully: {uploaded_file.filename}",
        "filename": uploaded_file.filename
    }), 200