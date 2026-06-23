import os
from pathlib import Path
from typing import Optional, List
from pydantic_settings import BaseSettings, SettingsConfigDict

ROOT_DIR = Path(__file__).resolve().parent.parent.parent
ENV_FILE_PATH = ROOT_DIR / ".env"

class Settings(BaseSettings):
    SUPABASE_URL: str = "https://placeholder-project.supabase.co"
    SUPABASE_KEY: str = "placeholder-anon-key"
    API_BASE_URL: str = "http://localhost:8000"
    FRONTEND_URL: str = "http://localhost:5173"
    CORS_ALLOWED_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://mystery-lab.vercel.app"
    ]

    model_config = SettingsConfigDict(env_file=str(ENV_FILE_PATH), extra="ignore")

settings = Settings()

def check_env_vars():
    import logging
    logger = logging.getLogger("ConfigurationAudit")
    errors = []
    
    url = settings.SUPABASE_URL
    key = settings.SUPABASE_KEY
    if not url or "placeholder" in url.lower() or url == "https://placeholder-project.supabase.co":
        errors.append("SUPABASE_URL is missing or contains placeholder values.")
    elif not url.startswith("http://") and not url.startswith("https://"):
        errors.append("SUPABASE_URL is invalid (must start with http:// or https://).")
        
    if not key or "placeholder" in key.lower() or key == "placeholder-anon-key":
        errors.append("SUPABASE_KEY is missing or contains placeholder values.")
        
    if errors:
        logger.error("❌ STAGING / PRODUCTION CONFIGURATION WARNINGS:")
        for err in errors:
            logger.error(f"  - {err}")
    else:
        logger.info("✅ Core configurations loaded successfully.")
    return len(errors) == 0
