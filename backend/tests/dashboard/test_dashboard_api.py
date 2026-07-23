from fastapi import status


def test_get_dashboard_returns_success(client, auth_headers):
    response = client.get(
        "/dashboard",
        headers=auth_headers,
    )

    assert response.status_code == status.HTTP_200_OK

    data = response.json()

    assert "profile_completion" in data
    assert "stats" in data
    assert "recent_projects" in data
    assert "recent_activity" in data


def test_dashboard_stats_contains_expected_keys(
    client,
    auth_headers,
):
    response = client.get(
        "/dashboard",
        headers=auth_headers,
    )

    stats = response.json()["stats"]

    assert "projects" in stats
    assert "skills" in stats
    assert "experiences" in stats
    assert "educations" in stats
    assert "certificates" in stats
