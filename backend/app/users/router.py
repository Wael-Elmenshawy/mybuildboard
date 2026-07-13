from fastapi import APIRouter, Depends

from app.api.deps import get_user_service
from app.auth.dependencies import get_current_user
from app.users.schema import UserResponse
from app.users.service import UserService

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get(
    "",
    response_model=list[UserResponse],
)
def get_users(
    service: UserService = Depends(get_user_service),
):
    return service.get_all_users()


@router.get("/me")
def current_user(
    user=Depends(get_current_user),
):
    return user
