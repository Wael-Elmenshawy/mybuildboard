from __future__ import annotations

from fastapi import Depends
from sqlalchemy.orm import Session

from app.assets.repository import AssetRepository
from app.assets.service import AssetService
from app.db.session import get_db


def get_asset_service(
    db: Session = Depends(get_db),
) -> AssetService:
    """
    Dependency that returns the asset service.
    """

    repository = AssetRepository(db)

    return AssetService(
        repository=repository,
    )
