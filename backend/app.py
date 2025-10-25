# backend/app.py
import sys
import os

# Add the src directory to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from api.app import app

if __name__ == '__main__':
    app.run()