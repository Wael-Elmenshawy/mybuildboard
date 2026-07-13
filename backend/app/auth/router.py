from fastapi import APIRouter, Depends

from app.api.deps import get_auth_service, get_user_service
from app.auth.service import AuthService
from app.shared.responses import SuccessResponse
from app.users.schema import UserCreate, UserResponse
from app.users.service import UserService

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post(
    "/register",
    response_model=UserResponse,
)
def register(
    user: UserCreate,
    service: UserService = Depends(get_user_service),
):
    return service.create_user(user)


@router.post(
    "/login",
    response_model=SuccessResponse,
)
def login(
    service: AuthService = Depends(get_auth_service),
):
    return SuccessResponse(
        message="Login successful.",
        data=service.login(),
    )
