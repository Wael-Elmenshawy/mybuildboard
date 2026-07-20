from __future__ import annotations

import uuid
from datetime import UTC, datetime, timedelta

from jose import JWTError, jwt

from app.core.config import settings

STATE_PURPOSE = "github_connect"


def create_state_token(user_id: uuid.UUID) -> str:
    expire = datetime.now(UTC) + timedelta(minutes=10)

    payload = {
        "sub": str(user_id),
        "purpose": STATE_PURPOSE,
        "exp": expire,
    }

    return jwt.encode(payload, settings.secret_key, algorithm=settings.algorithm)


def verify_state_token(token: str) -> uuid.UUID | None:
    try:
        payload = jwt.decode(
            token, settings.secret_key, algorithms=[settings.algorithm]
        )
    except JWTError:
        return None

    if payload.get("purpose") != STATE_PURPOSE:
        return None

    user_id = payload.get("sub")

    if user_id is None:
        return None

    return uuid.UUID(user_id)
