from __future__ import annotations

import uuid

from sqlalchemy.orm import Session

from app.shared.repositories.base_repository import BaseRepository
from app.social_links.model import SocialLink


class SocialLinkRepository(BaseRepository[SocialLink]):
    def __init__(self, db: Session):
        super().__init__(db, SocialLink)

    def get_by_id(self, social_link_id: uuid.UUID) -> SocialLink | None:
        return (
            self.db.query(SocialLink)
            .filter(SocialLink.id == social_link_id)
            .first()
        )

    def get_all_by_user(self, user_id: uuid.UUID) -> list[SocialLink]:
        return (
            self.db.query(SocialLink)
            .filter(SocialLink.user_id == user_id)
            .order_by(SocialLink.display_order.asc())
            .all()
        )