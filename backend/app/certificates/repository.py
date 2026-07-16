from __future__ import annotations

import uuid

from sqlalchemy.orm import Session

from app.certificates.model import Certificate
from app.shared.repositories.base_repository import BaseRepository


class CertificateRepository(BaseRepository[Certificate]):
    def __init__(self, db: Session):
        super().__init__(db, Certificate)

    def get_by_id(self, certificate_id: uuid.UUID) -> Certificate | None:
        return (
            self.db.query(Certificate)
            .filter(Certificate.id == certificate_id)
            .first()
        )

    def get_all_by_user(self, user_id: uuid.UUID) -> list[Certificate]:
        return (
            self.db.query(Certificate)
            .filter(Certificate.user_id == user_id)
            .order_by(Certificate.display_order.asc())
            .all()
        )