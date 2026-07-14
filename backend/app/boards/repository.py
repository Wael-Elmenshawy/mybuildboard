from __future__ import annotations

import uuid

from sqlalchemy.orm import Session

from app.boards.model import Board
from app.shared.repositories.base_repository import BaseRepository


class BoardRepository(BaseRepository[Board]):
    def __init__(self, db: Session):
        super().__init__(db, Board)

    def get_by_slug(
        self,
        slug: str,
    ) -> Board | None:
        return (
            self.db.query(Board)
            .filter(Board.slug == slug)
            .first()
        )

    def get_all_by_owner(
        self,
        owner_id: uuid.UUID,
    ) -> list[Board]:
        return (
            self.db.query(Board)
            .filter(Board.owner_id == owner_id)
            .all()
        )