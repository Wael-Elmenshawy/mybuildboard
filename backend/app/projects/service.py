from __future__ import annotations

import uuid

from fastapi import HTTPException, status

from app.boards.repository import BoardRepository
from app.github.repository import GithubRepoRepository
from app.projects.model import Project
from app.projects.repository import ProjectRepository
from app.projects.schema import (
    ProjectCreate,
    ProjectUpdate,
)
from app.users.model import User


class ProjectService:
    def __init__(
        self,
        repository: ProjectRepository,
        github_repo_repository: GithubRepoRepository,
    ):
        self.repository = repository
        self.github_repo_repository = github_repo_repository
        self.board_repository = BoardRepository(repository.db)

    def create(
        self,
        data: ProjectCreate,
        current_user: User,
    ) -> Project:

        board = self.board_repository.get(data.board_id)

        if board is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Board not found.",
            )

        if board.owner_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this board.",
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

    def import_from_github(
        self,
        board_id: uuid.UUID,
        github_repo_id: uuid.UUID,
        current_user: User,
    ) -> Project:

        board = self.board_repository.get(board_id)

        if board is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Board not found.",
            )

        if board.owner_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this board.",
            )

        repo = self.github_repo_repository.get(github_repo_id)

        if repo is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="GitHub repository not found.",
            )

        if self.repository.source_repo_exists(
            board_id,
            repo.id,
        ):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Repository already imported.",
            )

        base_slug = (
            repo.name.lower()
            .replace(" ", "-")
            .replace("_", "-")
        )

        slug = base_slug
        counter = 1

        while self.repository.slug_exists(slug):
            slug = f"{base_slug}-{counter}"
            counter += 1

        project = Project(
            board_id=board_id,
            title=repo.name,
            slug=slug,
            short_description=repo.description,
            github_url=repo.html_url,
            technologies=[repo.language] if repo.language else [],
            is_imported_from_github=True,
            source_github_repo_id=repo.id,
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
        board_id: uuid.UUID,
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
        current_user: User,
    ) -> Project:

        if project.board.owner_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this project.",
            )

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
        current_user: User,
    ) -> None:

        if project.board.owner_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this project.",
            )

        self.repository.delete(project)