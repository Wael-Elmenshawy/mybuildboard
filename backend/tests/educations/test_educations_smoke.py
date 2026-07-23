from fastapi import status


def test_create_education_requires_auth(client):
    response = client.post(
        "/api/v1/educations",
        json={},
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED
