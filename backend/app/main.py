from fastapi import FastAPI

from app.api.v1.router import router as api_router
from app.core.exceptions.handlers import register_exception_handlers
from app.core.middleware import RequestIDMiddleware

app = FastAPI(
    title="MyBuildBoard API",
    description=("Backend API for MyBuildBoard - A professional developer portfolio platform."),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
)

# Middlewares
app.add_middleware(RequestIDMiddleware)

# Global Exception Handlers
register_exception_handlers(app)

# API Routes
app.include_router(
    api_router,
    prefix="/api/v1",
)


@app.get(
    "/",
    tags=["Health"],
)
def root():
    return {
        "application": "MyBuildBoard API",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get(
    "/health",
    tags=["Health"],
)
def health_check():
    return {
        "status": "healthy",
    }
