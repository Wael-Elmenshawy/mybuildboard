from __future__ import annotations

from urllib.parse import urlencode

import httpx

from app.core.config import settings

GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize"
GITHUB_ACCESS_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUB_API_URL = "https://api.github.com"


def build_authorize_url(state: str) -> str:
    params = {
        "client_id": settings.github_client_id,
        "redirect_uri": settings.github_redirect_uri,
        "scope": "read:user repo",
        "state": state,
        "allow_signup": "false",
    }

    return f"{GITHUB_AUTHORIZE_URL}?{urlencode(params)}"


def exchange_code_for_token(code: str) -> dict:
    response = httpx.post(
        GITHUB_ACCESS_TOKEN_URL,
        headers={
            "Accept": "application/json",
        },
        data={
            "client_id": settings.github_client_id,
            "client_secret": settings.github_client_secret,
            "code": code,
            "redirect_uri": settings.github_redirect_uri,
        },
        timeout=30,
    )

    response.raise_for_status()
    return response.json()


def get_github_user(access_token: str) -> dict:
    response = httpx.get(
        f"{GITHUB_API_URL}/user",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github+json",
        },
        timeout=30,
    )

    response.raise_for_status()
    return response.json()


def list_github_repositories(access_token: str) -> list[dict]:
    response = httpx.get(
        f"{GITHUB_API_URL}/user/repos",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github+json",
        },
        params={
            "per_page": 100,
            "sort": "updated",
        },
        timeout=30,
    )

    response.raise_for_status()
    return response.json()
