from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse

from app.api.deps import get_github_service
from app.auth.dependencies import get_current_user
from app.core.config import settings
from app.github.schema import (
    GithubAuthorizeResponse,
    GithubConnectionResponse,
    GithubRepoResponse,
)
from app.github.service import GithubService

router = APIRouter(prefix="/github", tags=["GitHub Integration"])


@router.get("/connect", response_model=GithubAuthorizeResponse)
def connect_github(
    current_user=Depends(get_current_user),
    service: GithubService = Depends(get_github_service),
):
    authorize_url = service.get_authorize_url(current_user.id)
    return GithubAuthorizeResponse(authorize_url=authorize_url)


@router.get("/callback")
def github_callback(
    code: str,
    state: str,
    service: GithubService = Depends(get_github_service),
):
    try:
        service.handle_callback(code, state)
    except ValueError:
        return RedirectResponse(
            url=f"{settings.frontend_url}/settings/integrations?github=error",
        )

    return RedirectResponse(
        url=f"{settings.frontend_url}/settings/integrations?github=connected",
    )


@router.get("/status", response_model=GithubConnectionResponse | None)
def github_status(
    current_user=Depends(get_current_user),
    service: GithubService = Depends(get_github_service),
):
    return service.get_connection(current_user.id)


@router.post("/sync", response_model=list[GithubRepoResponse])
def sync_github_repositories(
    current_user=Depends(get_current_user),
    service: GithubService = Depends(get_github_service),
):
    try:
        return service.sync_repositories(current_user.id)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        ) from error


@router.get("/repositories", response_model=list[GithubRepoResponse])
def list_github_repositories(
    current_user=Depends(get_current_user),
    service: GithubService = Depends(get_github_service),
):
    return service.get_repositories(current_user.id)


@router.delete("/disconnect", status_code=status.HTTP_204_NO_CONTENT)
def disconnect_github(
    current_user=Depends(get_current_user),
    service: GithubService = Depends(get_github_service),
):
    try:
        service.disconnect(current_user.id)
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        ) from error
