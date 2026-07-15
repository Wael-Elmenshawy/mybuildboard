from __future__ import annotations

from fastapi import HTTPException, status

from app.boards.repository import BoardRepository
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
        self.board_repository = BoardRepository(repository.db)

    def create(
        self,
        data: ProjectCreate,
    ) -> Project:

        board = self.board_repository.get(data.board_id)

        if board is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Board not found.",
            )

        if self.repository.slug_exists(data.slug):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Project slug already exists.",
            )

        project = Project(
            **data.model_dump(),
        )

        return self.repository.create(project)

    def get_by_slug(
        self,
        slug: str,
    ) -> Project:

        project = self.repository.get_by_slug(slug)

        if project is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Project not found.",
            )

        return project

    def get_all(
        self,
        board_id,
    ) -> list[Project]:

        board = self.board_repository.get(board_id)

        if board is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Board not found.",
            )

        return self.repository.get_all_by_board(board_id)

    def update(
        self,
        project: Project,
        data: ProjectUpdate,
    ) -> Project:

        values = data.model_dump(exclude_unset=True)

        if (
            "slug" in values
            and values["slug"] != project.slug
            and self.repository.slug_exists_except(
                values["slug"],
                project.id,
            )
        ):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Project slug already exists.",
            )

        for key, value in values.items():
            setattr(project, key, value)

        return self.repository.update(project)

    def delete(
        self,
        project: Project,
    ) -> None:
        self.repository.delete(project)