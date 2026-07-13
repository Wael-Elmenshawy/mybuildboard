from __future__ import annotations

import uuid

from app.boards.model import Board
from app.boards.repository import BoardRepository
from app.boards.schema import BoardCreate, BoardUpdate


class BoardService:
    def __init__(self, repository: BoardRepository):
        self.repository = repository

    def create(
        self,
        owner_id: uuid.UUID,
        data: BoardCreate,
    ) -> Board:
        board = Board(
            owner_id=owner_id,
            **data.model_dump(),
        )

        return self.repository.create(board)

    def get_by_slug(
        self,
        slug: str,
    ) -> Board | None:
        return self.repository.get_by_slug(slug)

    def get_all(
        self,
        owner_id: uuid.UUID,
    ) -> list[Board]:
        return self.repository.get_all_by_owner(owner_id)

    def update(
        self,
        board: Board,
        data: BoardUpdate,
    ) -> Board:
        values = data.model_dump(exclude_unset=True)

        for key, value in values.items():
            setattr(board, key, value)

        return self.repository.update(board)

    def delete(
        self,
        board: Board,
    ) -> None:
        self.repository.delete(board)
