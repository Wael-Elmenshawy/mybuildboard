from __future__ import annotations

import uuid

from fastapi import HTTPException, status

from app.certificates.model import Certificate
from app.certificates.repository import CertificateRepository
from app.certificates.schema import (
    CertificateCreate,
    CertificateUpdate,
)
from app.users.model import User


class CertificateService:
    def __init__(
        self,
        repository: CertificateRepository,
    ):
        self.repository = repository

    def create(
        self,
        user_id: uuid.UUID,
        data: CertificateCreate,
    ) -> Certificate:
        certificate = Certificate(
            user_id=user_id,
            **data.model_dump(),
        )

        return self.repository.create(certificate)

    def get_all(
        self,
        user_id: uuid.UUID,
    ) -> list[Certificate]:
        return self.repository.get_all_by_user(user_id)

    def get_by_id(
        self,
        certificate_id: uuid.UUID,
    ) -> Certificate:

        certificate = self.repository.get_by_id(certificate_id)

        if certificate is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Certificate not found.",
            )

        return certificate

    def update(
        self,
        certificate: Certificate,
        data: CertificateUpdate,
        current_user: User,
    ) -> Certificate:

        if certificate.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this certificate.",
            )

        values = data.model_dump(exclude_unset=True)

        for key, value in values.items():
            setattr(certificate, key, value)

        return self.repository.update(certificate)

    def delete(
        self,
        certificate: Certificate,
        current_user: User,
    ) -> None:

        if certificate.user_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not own this certificate.",
            )

        self.repository.delete(certificate)
