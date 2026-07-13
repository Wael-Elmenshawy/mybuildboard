from app.auth.jwt import create_access_token
from app.core.logging import get_logger

logger = get_logger(__name__)


class AuthService:
    def login(self) -> dict:
        logger.info("User login attempt")

        token = create_access_token(
            {
                "sub": "wael",
            }
        )

        logger.info("JWT token created successfully")

        return {
            "access_token": token,
            "token_type": "bearer",
        }
