from fastapi import status


def test_create_skill_requires_auth(client):
    response = client.post(
        "/api/v1/skills",
        json={},
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
