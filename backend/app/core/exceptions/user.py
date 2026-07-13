from fastapi import status

from app.core.exceptions.base import AppException


class UserAlreadyExistsException(AppException):
    def __init__(self):
        super().__init__(
            status_code=status.HTTP_409_CONFLICT,
            code="USER_ALREADY_EXISTS",
            message="Email already exists.",
        )
