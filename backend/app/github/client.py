from __future__ import annotations

import httpx

from app.core.config import settings

GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize"
GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
GITHUB_API_BASE = "https://api.github.com"


def build_authorize_url(state: str) -> str:
    params = {
        "client_id": settings.github_client_id,
        "redirect_uri": settings.github_redirect_uri,
        "scope": "read:user repo",
        "state": state,
        "allow_signup": "false",
    }
    query = "&".join(f"{key}={value}" for key, value in params.items())
    return f"{GITHUB_AUTHORIZE_URL}?{query}"


def exchange_code_for_token(code: str) -> dict:
    response = httpx.post(
        GITHUB_TOKEN_URL,
        headers={"Accept": "application/json"},
        data={
            "client_id": settings.github_client_id,
            "client_secret": settings.github_client_secret,
            "code": code,
            "redirect_uri": settings.github_redirect_uri,
        },
        timeout=10.0,
    )
    response.raise_for_status()
    return response.json()


def get_github_user(access_token: str) -> dict:
    response = httpx.get(
        f"{GITHUB_API_BASE}/user",
        headers={
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/vnd.github+json",
        },
        timeout=10.0,
    )
    response.raise_for_status()
    return response.json()


def list_github_repositories(access_token: str) -> list[dict]:
    repos: list[dict] = []
    page = 1

    while True:
        response = httpx.get(
            f"{GITHUB_API_BASE}/user/repos",
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/vnd.github+json",
            },
            params={"per_page": 100, "page": page, "sort": "updated"},
            timeout=10.0,
        )
        response.raise_for_status()
        data = response.json()

        if not data:
            break

        repos.extend(data)
        page += 1

    return repos