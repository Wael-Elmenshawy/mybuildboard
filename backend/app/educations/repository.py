from __future__ import annotations

import uuid

from sqlalchemy.orm import Session

from app.educations.model import Education
from app.shared.repositories.base_repository import BaseRepository


class EducationRepository(BaseRepository[Education]):
    def __init__(self, db: Session):
        super().__init__(db, Education)

    def get_by_id(self, education_id: uuid.UUID) -> Education | None:
        return self.db.query(Education).filter(Education.id == education_id).first()

    def get_all_by_user(self, user_id: uuid.UUID) -> list[Education]:
        return (
            self.db.query(Education)
            .filter(Education.user_id == user_id)
            .order_by(Education.display_order.asc())
            .all()
        )
