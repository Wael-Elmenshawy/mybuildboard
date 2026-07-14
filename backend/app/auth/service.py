from __future__ import annotations

from sqlalchemy.orm import Session

from app.auth.jwt import create_access_token
from app.core.logging import get_logger
from app.core.security import verify_password
from app.users.repository import UserRepository

logger = get_logger(__name__)


class AuthService:
    def __init__(self, db: Session):
        self.repository = UserRepository(db)

    def login(
        self,
        username: str,
        password: str,
    ) -> dict:

        user = self.repository.get_by_username(username)

        if user is None:
            user = self.repository.get_by_email(username)

        if user is None:
            raise ValueError("Invalid username or password.")

        if user.password is None:
            raise ValueError("This account cannot be used for local login.")

        if not verify_password(
            password,
            user.password,
        ):
            raise ValueError("Invalid username or password.")

        if not user.is_active:
            raise ValueError("User account is inactive.")

        token = create_access_token(
            {
                "sub": str(user.id),
                "username": user.username,
                "email": user.email,
            }
        )

        logger.info(
            "User '%s' logged in successfully.",
            user.username,
        )

        return {
            "access_token": token,
            "token_type": "bearer",
        }