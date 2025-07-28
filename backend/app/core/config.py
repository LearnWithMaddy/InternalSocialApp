from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Intranet"
    DATABASE_URL: str = (
        "mssql+pyodbc://sa:YourStrong!Pass@localhost/SocialDB?driver=ODBC+Driver+17+for+SQL+Server"
    )
    SECRET_KEY: str = "supersecret"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"

settings = Settings()
