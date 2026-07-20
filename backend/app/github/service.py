from __future__ import annotations

import uuid
from datetime import UTC, datetime

from app.github import client as github_client
from app.github.model import GithubConnection, GithubRepo
from app.github.repository import GithubConnectionRepository, GithubRepoRepository
from app.github.security import decrypt_token, encrypt_token
from app.github.state import create_state_token, verify_state_token


class GithubService:
    def __init__(
        self,
        connection_repository: GithubConnectionRepository,
        repo_repository: GithubRepoRepository,
    ):
        self.connection_repository = connection_repository
        self.repo_repository = repo_repository

    def get_authorize_url(self, user_id: uuid.UUID) -> str:
        state = create_state_token(user_id)
        return github_client.build_authorize_url(state)

    def handle_callback(self, code: str, state: str) -> uuid.UUID:
        user_id = verify_state_token(state)

        if user_id is None:
            raise ValueError("Invalid or expired state token.")

        token_data = github_client.exchange_code_for_token(code)
        access_token = token_data.get("access_token")

        if access_token is None:
            raise ValueError("GitHub did not return an access token.")

        github_user = github_client.get_github_user(access_token)
        connection = self.connection_repository.get_by_user_id(user_id)

        if connection is None:
            connection = GithubConnection(
                user_id=user_id,
                github_user_id=github_user["id"],
                github_username=github_user["login"],
                access_token_encrypted=encrypt_token(access_token),
                scope=token_data.get("scope"),
                connected_at=datetime.now(UTC),
            )
            self.connection_repository.create(connection)
        else:
            connection.github_user_id = github_user["id"]
            connection.github_username = github_user["login"]
            connection.access_token_encrypted = encrypt_token(access_token)
            connection.scope = token_data.get("scope")
            connection.connected_at = datetime.now(UTC)
            self.connection_repository.update(connection)

        return user_id

    def sync_repositories(self, user_id: uuid.UUID) -> list[GithubRepo]:
        connection = self.connection_repository.get_by_user_id(user_id)

        if connection is None:
            raise ValueError("GitHub account is not connected.")

        access_token = decrypt_token(connection.access_token_encrypted)
        repos_data = github_client.list_github_repositories(access_token)

        for repo_data in repos_data:
            existing = self.repo_repository.get_by_github_repo_id(
                connection.id,
                repo_data["id"],
            )

            if existing is None:
                repo = GithubRepo(
                    connection_id=connection.id,
                    github_repo_id=repo_data["id"],
                    name=repo_data["name"],
                    full_name=repo_data["full_name"],
                    description=repo_data.get("description"),
                    html_url=repo_data["html_url"],
                    language=repo_data.get("language"),
                    stars_count=repo_data.get("stargazers_count", 0),
                    forks_count=repo_data.get("forks_count", 0),
                    is_private=repo_data.get("private", False),
                    is_fork=repo_data.get("fork", False),
                )
                self.repo_repository.create(repo)
            else:
                existing.name = repo_data["name"]
                existing.full_name = repo_data["full_name"]
                existing.description = repo_data.get("description")
                existing.html_url = repo_data["html_url"]
                existing.language = repo_data.get("language")
                existing.stars_count = repo_data.get("stargazers_count", 0)
                existing.forks_count = repo_data.get("forks_count", 0)
                existing.is_private = repo_data.get("private", False)
                existing.is_fork = repo_data.get("fork", False)
                self.repo_repository.update(existing)

        return self.repo_repository.get_by_connection_id(connection.id)

    def get_connection(self, user_id: uuid.UUID) -> GithubConnection | None:
        return self.connection_repository.get_by_user_id(user_id)

    def get_repositories(self, user_id: uuid.UUID) -> list[GithubRepo]:
        connection = self.connection_repository.get_by_user_id(user_id)

        if connection is None:
            return []

        return self.repo_repository.get_by_connection_id(connection.id)

    def disconnect(self, user_id: uuid.UUID) -> None:
        connection = self.connection_repository.get_by_user_id(user_id)

        if connection is None:
            raise ValueError("GitHub account is not connected.")

        self.connection_repository.delete(connection)
