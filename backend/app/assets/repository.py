from __future__ import annotations

import uuid

from sqlalchemy.orm import Session

from app.assets.model import Asset
from app.shared.repositories.base_repository import BaseRepository


class AssetRepository(BaseRepository[Asset]):
    """
    Repository for Asset entity.
    """

    def __init__(
        self,
        db: Session,
    ) -> None:
        super().__init__(
            db=db,
            model=Asset,
        )

    def get_by_storage_key(
        self,
        storage_key: str,
    ) -> Asset | None:
        return (
            self.db.query(Asset)
            .filter(Asset.storage_key == storage_key)
            .first()
        )

    def get_by_owner(
        self,
        owner_id: uuid.UUID,
    ) -> list[Asset]:
        return (
            self.db.query(Asset)
            .filter(Asset.owner_id == owner_id)
            .order_by(Asset.created_at.desc())
            .all()
        )