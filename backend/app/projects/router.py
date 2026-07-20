from __future__ import annotations

import uuid

from fastapi import APIRouter, Depends, status

from app.api.deps import get_project_service
from app.auth.dependencies import get_current_user
from app.projects.schema import (
    ProjectCreate,
    ProjectResponse,
    ProjectUpdate,
)
from app.projects.service import ProjectService
from app.users.model import User

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


@router.post(
    "",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_project(
    data: ProjectCreate,
    current_user: User = Depends(get_current_user),
    service: ProjectService = Depends(get_project_service),
):
    return service.create(
        data,
        current_user,
    )


@router.post(
    "/import-from-github",
    response_model=ProjectResponse,
    status_code=status.HTTP_201_CREATED,
)
def import_project_from_github(
    board_id: uuid.UUID,
    github_repo_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    service: ProjectService = Depends(get_project_service),
):
    return service.import_from_github(
        board_id=board_id,
        github_repo_id=github_repo_id,
        current_user=current_user,
    )


@router.get(
    "/board/{board_id}",
    response_model=list[ProjectResponse],
)
def get_board_projects(
    board_id: uuid.UUID,
    service: ProjectService = Depends(get_project_service),
):
    return service.get_all(board_id)


@router.get(
    "/{slug}",
    response_model=ProjectResponse,
)
def get_project(
    slug: str,
    service: ProjectService = Depends(get_project_service),
):
    return service.get_by_slug(slug)


@router.patch(
    "/{slug}",
    response_model=ProjectResponse,
)
def update_project(
    slug: str,
    data: ProjectUpdate,
    current_user: User = Depends(get_current_user),
    service: ProjectService = Depends(get_project_service),
):
    project = service.get_by_slug(slug)

    return service.update(
        project,
        data,
        current_user,
    )


@router.delete(
    "/{slug}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_project(
    slug: str,
    current_user: User = Depends(get_current_user),
    service: ProjectService = Depends(get_project_service),
):
    project = service.get_by_slug(slug)

    service.delete(
        project,
        current_user,
    )
