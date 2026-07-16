from __future__ import annotations

import uuid

from app.social_links.model import SocialLink
from app.social_links.repository import SocialLinkRepository
from app.social_links.schema import SocialLinkCreate, SocialLinkUpdate


class SocialLinkService:
    def __init__(self, repository: SocialLinkRepository):
        self.repository = repository

    def create(self, user_id: uuid.UUID, data: SocialLinkCreate) -> SocialLink:
        social_link = SocialLink(user_id=user_id, **data.model_dump())
        return self.repository.create(social_link)

    def get_all(self, user_id: uuid.UUID) -> list[SocialLink]:
        return self.repository.get_all_by_user(user_id)

    def get_by_id(self, social_link_id: uuid.UUID) -> SocialLink | None:
        return self.repository.get_by_id(social_link_id)

    def update(self, social_link: SocialLink, data: SocialLinkUpdate) -> SocialLink:
        values = data.model_dump(exclude_unset=True)
        for key, value in values.items():
            setattr(social_link, key, value)
        return self.repository.update(social_link)

    def delete(self, social_link: SocialLink) -> None:
        self.repository.delete(social_link)