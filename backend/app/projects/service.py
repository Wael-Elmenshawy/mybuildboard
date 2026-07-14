from __future__ import annotations

from app.projects.model import Project
from app.projects.repository import ProjectRepository
from app.projects.schema import (
    ProjectCreate,
    ProjectUpdate,
)


class ProjectService:
    def __init__(
        self,
        repository: ProjectRepository,
    ):
        self.repository = repository

    def create(
        self,
        data: ProjectCreate,
    ) -> Project:
        project = Project(
            **data.model_dump(),
        )

        return self.repository.create(project)

    def get_by_slug(
        self,
        slug: str,
    ) -> Project | None:
        return self.repository.get_by_slug(slug)

    def get_all(
        self,
        board_id,
    ) -> list[Project]:
        return self.repository.get_all_by_board(board_id)

    def update(
        self,
        project: Project,
        data: ProjectUpdate,
    ) -> Project:
        values = data.model_dump(exclude_unset=True)

        for key, value in values.items():
            setattr(project, key, value)

        return self.repository.update(project)

    def delete(
        self,
        project: Project,
    ) -> None:
        self.repository.delete(project)