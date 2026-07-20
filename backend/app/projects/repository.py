from __future__ import annotations

import uuid

from sqlalchemy.orm import Session

from app.projects.model import Project
from app.shared.repositories.base_repository import BaseRepository


class ProjectRepository(BaseRepository[Project]):
    def __init__(
        self,
        db: Session,
    ):
        super().__init__(db, Project)

    def get_by_slug(
        self,
        slug: str,
    ) -> Project | None:
        return self.db.query(Project).filter(Project.slug == slug).first()

    def get_all_by_board(
        self,
        board_id: uuid.UUID,
    ) -> list[Project]:
        return (
            self.db.query(Project)
            .filter(Project.board_id == board_id)
            .order_by(Project.display_order.asc())
            .all()
        )

    def slug_exists(
        self,
        slug: str,
    ) -> bool:
        return self.db.query(Project).filter(Project.slug == slug).first() is not None

    def slug_exists_except(
        self,
        slug: str,
        project_id: uuid.UUID,
    ) -> bool:
        return (
            self.db.query(Project)
            .filter(
                Project.slug == slug,
                Project.id != project_id,
            )
            .first()
            is not None
        )

    def source_repo_exists(
        self,
        board_id: uuid.UUID,
        github_repo_id: uuid.UUID,
    ) -> bool:
        return (
            self.db.query(Project)
            .filter(
                Project.board_id == board_id,
                Project.source_github_repo_id == github_repo_id,
            )
            .first()
            is not None
        )
