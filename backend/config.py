import os

class Config:
    """Flask application configuration"""

    # Server settings
    HOST = os.getenv('HOST', '0.0.0.0')
    PORT = int(os.getenv('PORT', '5000'))
    DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'

    # Database settings
    # Works offline using backend/learnify.db
    # On PythonAnywhere, override with environment variable DATABASE_PATH
    DATABASE_PATH = os.environ.get('DATABASE_PATH', 'learnify.db')

    # API settings
    VALID_API_KEYS = [
        'test-api-key-12345'
    ]
