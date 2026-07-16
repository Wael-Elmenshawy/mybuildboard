from __future__ import annotations

import uuid

from sqlalchemy.orm import Session

from app.github.model import GithubConnection, GithubRepo
from app.shared.repositories.base_repository import BaseRepository


class GithubConnectionRepository(BaseRepository[GithubConnection]):
    def __init__(self, db: Session):
        super().__init__(db, GithubConnection)

    def get_by_user_id(self, user_id: uuid.UUID) -> GithubConnection | None:
        return (
            self.db.query(GithubConnection)
            .filter(GithubConnection.user_id == user_id)
            .first()
        )


class GithubRepoRepository(BaseRepository[GithubRepo]):
    def __init__(self, db: Session):
        super().__init__(db, GithubRepo)

    def get_by_connection_id(self, connection_id: uuid.UUID) -> list[GithubRepo]:
        return (
            self.db.query(GithubRepo)
            .filter(GithubRepo.connection_id == connection_id)
            .order_by(GithubRepo.stars_count.desc())
            .all()
        )

    def get_by_github_repo_id(
        self,
        connection_id: uuid.UUID,
        github_repo_id: int,
    ) -> GithubRepo | None:
        return (
            self.db.query(GithubRepo)
            .filter(
                GithubRepo.connection_id == connection_id,
                GithubRepo.github_repo_id == github_repo_id,
            )
            .first()
        )