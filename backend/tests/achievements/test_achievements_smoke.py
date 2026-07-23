from fastapi import status


def test_create_achievement_requires_auth(client):
    response = client.post(
        "/api/v1/achievements",
        json={},
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
