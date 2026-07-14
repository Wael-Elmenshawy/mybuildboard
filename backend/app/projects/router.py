from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status

from app.api.deps import get_project_service
from app.projects.schema import (
    ProjectCreate,
    ProjectResponse,
    ProjectUpdate,
)
from app.projects.service import ProjectService

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
    service: ProjectService = Depends(get_project_service),
):
    return service.create(data)


@router.get(
    "/board/{board_id}",
    response_model=list[ProjectResponse],
)
def get_board_projects(
    board_id,
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
    project = service.get_by_slug(slug)

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    return project


@router.patch(
    "/{slug}",
    response_model=ProjectResponse,
)
def update_project(
    slug: str,
    data: ProjectUpdate,
    service: ProjectService = Depends(get_project_service),
):
    project = service.get_by_slug(slug)

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    return service.update(
        project,
        data,
    )


@router.delete(
    "/{slug}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_project(
    slug: str,
    service: ProjectService = Depends(get_project_service),
):
    project = service.get_by_slug(slug)

    if project is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found",
        )

    service.delete(project)