from __future__ import annotations

import uuid

from app.certificates.model import Certificate
from app.certificates.repository import CertificateRepository
from app.certificates.schema import CertificateCreate, CertificateUpdate


class CertificateService:
    def __init__(self, repository: CertificateRepository):
        self.repository = repository

    def create(self, user_id: uuid.UUID, data: CertificateCreate) -> Certificate:
        certificate = Certificate(user_id=user_id, **data.model_dump())
        return self.repository.create(certificate)

    def get_all(self, user_id: uuid.UUID) -> list[Certificate]:
        return self.repository.get_all_by_user(user_id)

    def get_by_id(self, certificate_id: uuid.UUID) -> Certificate | None:
        return self.repository.get_by_id(certificate_id)

    def update(self, certificate: Certificate, data: CertificateUpdate) -> Certificate:
        values = data.model_dump(exclude_unset=True)
        for key, value in values.items():
            setattr(certificate, key, value)
        return self.repository.update(certificate)

    def delete(self, certificate: Certificate) -> None:
        self.repository.delete(certificate)