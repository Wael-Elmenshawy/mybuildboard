from __future__ import annotations

from cryptography.fernet import Fernet

from app.core.config import settings

_fernet = Fernet(settings.github_token_encryption_key.encode())


def encrypt_token(token: str) -> str:
    return _fernet.encrypt(token.encode()).decode()


def decrypt_token(encrypted_token: str) -> str:
    return _fernet.decrypt(encrypted_token.encode()).decode()