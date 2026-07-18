from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    database_url: str

    secret_key: str
    algorithm: str
    access_token_expire_minutes: int

    github_client_id: str
    github_client_secret: str
    github_redirect_uri: str
    github_token_encryption_key: str

    frontend_url: str

    # Cloudflare R2
    r2_account_id: str
    r2_bucket_name: str
    r2_access_key_id: str
    r2_secret_access_key: str
    r2_public_url: str

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
    )


settings = Settings()