import os
import sys

# Add root directory to python path so we can import the `app` package
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the FastAPI application
from app.main import app as fastapi_app

# ASGI middleware that strips the "/api" prefix from incoming requests.
# This maps "/api/contact/" to "/contact/" in FastAPI.
async def app(scope, receive, send):
    if scope["type"] == "http":
        path = scope.get("path", "")
        if path.startswith("/api"):
            # Strip the "/api" prefix
            scope["path"] = path[4:] or "/"
            
            # Strip from raw_path (bytes) if present
            raw_path = scope.get("raw_path", b"")
            if raw_path.startswith(b"/api"):
                scope["raw_path"] = raw_path[4:] or b"/"
                
    await fastapi_app(scope, receive, send)
