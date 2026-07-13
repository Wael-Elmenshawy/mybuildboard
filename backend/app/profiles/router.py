from fastapi import APIRouter, Depends

from app.api.deps import get_profile_service
from app.auth.dependencies import get_current_user
from app.profiles.schema import (
    ProfileCreate,
    ProfileResponse,
    ProfileUpdate,
)
from app.profiles.service import ProfileService

router = APIRouter(
    prefix="/profiles",
    tags=["Profiles"],
)


@router.get(
    "/me",
    response_model=ProfileResponse | None,
)
def my_profile(
    user=Depends(get_current_user),
    service: ProfileService = Depends(get_profile_service),
):
    return service.get_profile(str(user.id))


@router.post(
    "",
    response_model=ProfileResponse,
)
def create_profile(
    profile: ProfileCreate,
    user=Depends(get_current_user),
    service: ProfileService = Depends(get_profile_service),
):
    return service.create_profile(
        str(user.id),
        profile,
    )


@router.put(
    "",
    response_model=ProfileResponse | None,
)
def update_profile(
    profile: ProfileUpdate,
    user=Depends(get_current_user),
    service: ProfileService = Depends(get_profile_service),
):
    return service.update_profile(
        str(user.id),
        profile,
    )
