from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_social_link_service
from app.auth.dependencies import get_current_user
from app.social_links.schema import (
    SocialLinkCreate,
    SocialLinkResponse,
    SocialLinkUpdate,
)
from app.social_links.service import SocialLinkService

router = APIRouter(prefix="/social-links", tags=["Social Links"])


@router.post("", response_model=SocialLinkResponse, status_code=status.HTTP_201_CREATED)
def create_social_link(
    data: SocialLinkCreate,
    current_user=Depends(get_current_user),
    service: SocialLinkService = Depends(get_social_link_service),
):
    return service.create(current_user.id, data)


@router.get("/me", response_model=list[SocialLinkResponse])
def get_my_social_links(
    current_user=Depends(get_current_user),
    service: SocialLinkService = Depends(get_social_link_service),
):
    return service.get_all(current_user.id)


@router.patch("/{social_link_id}", response_model=SocialLinkResponse)
def update_social_link(
    social_link_id,
    data: SocialLinkUpdate,
    current_user=Depends(get_current_user),
    service: SocialLinkService = Depends(get_social_link_service),
):
    social_link = service.get_by_id(social_link_id)
    if social_link is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Social link not found")
    if social_link.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied.")
    return service.update(social_link, data)


@router.delete("/{social_link_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_social_link(
    social_link_id,
    current_user=Depends(get_current_user),
    service: SocialLinkService = Depends(get_social_link_service),
):
    social_link = service.get_by_id(social_link_id)
    if social_link is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Social link not found")
    if social_link.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permission denied.")
    service.delete(social_link)