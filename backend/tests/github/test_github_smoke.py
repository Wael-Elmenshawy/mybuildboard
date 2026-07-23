from fastapi import status


def test_github_connect_requires_auth(client):
    response = client.get("/api/v1/github/connect")

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
