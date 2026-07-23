from fastapi import status


def test_create_social_link_requires_auth(client):
    response = client.post(
        "/api/v1/social-links",
        json={},
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
