from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, status

from app.api.deps import get_social_link_service
from app.auth.dependencies import get_current_user
from app.social_links.schema import (
    SocialLinkCreate,
    SocialLinkResponse,
    SocialLinkUpdate,
)
from app.social_links.service import SocialLinkService
from app.users.model import User

router = APIRouter(
    prefix="/social-links",
    tags=["Social Links"],
)


@router.post(
    "",
    response_model=SocialLinkResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_social_link(
    data: SocialLinkCreate,
    current_user: User = Depends(get_current_user),
    service: SocialLinkService = Depends(get_social_link_service),
):
    return service.create(
        current_user.id,
        data,
    )


@router.get(
    "/me",
    response_model=list[SocialLinkResponse],
)
def get_my_social_links(
    current_user: User = Depends(get_current_user),
    service: SocialLinkService = Depends(get_social_link_service),
):
    return service.get_all(
        current_user.id,
    )


@router.patch(
    "/{social_link_id}",
    response_model=SocialLinkResponse,
)
def update_social_link(
    social_link_id: uuid.UUID,
    data: SocialLinkUpdate,
    current_user: User = Depends(get_current_user),
    service: SocialLinkService = Depends(get_social_link_service),
):
    social_link = service.get_by_id(social_link_id)

    return service.update(
        social_link,
        data,
        current_user,
    )


@router.delete(
    "/{social_link_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_social_link(
    social_link_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    service: SocialLinkService = Depends(get_social_link_service),
):
    social_link = service.get_by_id(social_link_id)

    service.delete(
        social_link,
        current_user,
    )

    return None
