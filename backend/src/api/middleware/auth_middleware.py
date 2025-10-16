# ⚠️ PARTIAL: Basic structure, needs completion
from functools import wraps
from flask import request, jsonify
from config import Config


def require_api_key(f):
    """
    Decorator to require API key authentication

    Checks for 'Authorization' header with format: 'Bearer YOUR_API_KEY'
    Returns 401 if missing or invalid

    TODO: Complete this middleware
    - Extract the Authorization header from request
    - Check if header exists and starts with 'Bearer '
    - Extract the API key (token after 'Bearer ')
    - Validate against Config.VALID_API_KEYS
    - Return proper error responses for missing/invalid keys
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # TODO: Implement API key validation logic here
        # Currently returns 401 for all requests since validation is not implemented
        return jsonify({
            'error': {
                'code': 'API_KEY_VALIDATION_NOT_IMPLEMENTED',
                'message': 'API key validation has not been implemented yet'
            }
        }), 401

    return decorated_function