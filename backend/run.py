# backend/run.py
from src.api.app import create_app  

app = create_app()

if __name__ == "__main__":
    # Local dev server
    app.run(host="0.0.0.0", port=5000, debug=True)  # debug=True for local testing
