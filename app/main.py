from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import router
from app.core.config import check_env_vars

app = FastAPI(
    title="Mystery Lab API Engine",
    version="1.0.0",
    description="Production backend API engine for Mystery Lab science education platform."
)

@app.on_event("startup")
async def startup_event():
    check_env_vars()

# Configure CORS Middleware for frontend integrations
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://mystery-lab.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/", tags=["General"])
async def root():
    return {"message": "Welcome to the Mystery Lab API Engine"}

@app.get("/health", tags=["General"])
async def health_check():
    return {"status": "ok"}

app.include_router(router)
