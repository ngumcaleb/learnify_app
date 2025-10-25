from functools import wraps
from flask import request, jsonify
from config import Config


def require_api_key(f):
    """
    Decorator to require API key authentication

    Checks for 'Authorization' header with format: 'Bearer YOUR_API_KEY'
    Returns 401 if missing or invalid
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')

        if not auth_header:
            return jsonify({
                'error': {
                    'code': 'MISSING_AUTHORIZATION_HEADER',
                    'message': 'Authorization header is required'
                }
            }), 401

        if not auth_header.startswith('Bearer '):
            return jsonify({
                'error': {
                    'code': 'INVALID_AUTHORIZATION_SCHEME',
                    'message': "Authorization header must start with 'Bearer '"
                }
            }), 401

        api_key = auth_header[len('Bearer '):].strip()
        if not api_key:
            return jsonify({
                'error': {
                    'code': 'EMPTY_API_KEY',
                    'message': 'API key is missing in Authorization header'
                }
            }), 401

        if api_key not in Config.VALID_API_KEYS:
            return jsonify({
                'error': {
                    'code': 'INVALID_API_KEY',
                    'message': 'API key is invalid'
                }
            }), 401

        return f(*args, **kwargs)

    return decorated_function