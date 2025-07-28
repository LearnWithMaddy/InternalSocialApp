from fastapi import FastAPI
from app.routers import auth
from app.core.config import settings
app = FastAPI(title=settings.PROJECT_NAME)

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])

@app.get("/")
def root():
    return {"message": "Welcome to the Social App API"}
