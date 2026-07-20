from __future__ import annotations

import uuid

from fastapi import HTTPException, status

from app.social_links.model import SocialLink
from app.social_links.repository import SocialLinkRepository
from app.social_links.schema import (
    SocialLinkCreate,
    SocialLinkUpdate,
)
from app.users.model import User


class SocialLinkService:
    def __init__(
        self,
        repository: SocialLinkRepository,
    ):
        self.repository = repository

    def create(
        self,
        user_id: uuid.UUID,
        data: SocialLinkCreate,
    ) -> SocialLink:
        social_link = SocialLink(
            user_id=user_id,
            **data.model_dump(),
        )

        return self.repository.create(social_link)

    def get_all(
        self,
        user_id: uuid.UUID,
    ) -> list[SocialLink]:
        return self.repository.get_all_by_user(user_id)

    def get_by_id(
        self,
        social_link_id: uuid.UUID,
    ) -> SocialLink:

        social_link = self.repository.get_by_id(social_link_id)

        if social_link is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Social link not found.",
            )

        return social_link

    def update(
        self,
        social_link: SocialLink,
        data: SocialLinkUpdate,
        current_user: User,
    ) -> SocialLink:

        if social_link.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this social link.",
            )

        values = data.model_dump(exclude_unset=True)

        for key, value in values.items():
            setattr(social_link, key, value)

        return self.repository.update(social_link)

    def delete(
        self,
        social_link: SocialLink,
        current_user: User,
    ) -> None:

        if social_link.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this social link.",
            )

        self.repository.delete(social_link)
