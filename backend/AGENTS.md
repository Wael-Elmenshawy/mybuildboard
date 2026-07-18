# AGENTS — Engineering Guide

This document describes the existing architecture, conventions, and rules for the repository. It documents what is already present in the codebase and prescribes the conventions to follow when working in this project.

## Project Overview
- FastAPI backend for MyBuildBoard (API mounted under `/api/v1`).
- Clear domain packages under `app/` (e.g., `projects`, `assets`, `users`, `boards`, `github`).
- Each domain typically contains: `model.py`, `repository.py`, `service.py`, `schema.py`, `router.py`.
- Synchronous SQLAlchemy 2.0 stack and Alembic for migrations.

## Architecture
- Layered design: Models → Repositories → Services → Routers.
- Shared utilities and base classes live under `app/shared` and `app/core`.
- DB infra under `app/db` (`Base`, `engine`, `SessionLocal`, `get_db`).
- Global middleware and exception registration in `app/core`.

## Repository Pattern
- `app/shared/repositories/base_repository.py` provides `BaseRepository[T]` with basic CRUD:
  - `get_by_id`, `get_all`, `create`, `update`, `delete`.
  - Commits and refresh within repository methods (sync `Session`).
- Domain repositories extend `BaseRepository` and add custom queries.
- Repositories accept a `Session` instance (injected via DI) and expose typed models.

## Service Layer
- Services contain business logic and orchestrate repositories and other services.
- Services remain synchronous and return/accept ORM models or Pydantic DTOs.
- Validation and business rules live in services; persistence lives in repositories.
- `AssetService` handles DB record orchestration; physical uploads are delegated to `StorageService`.

## SQLAlchemy 2.0 conventions
- `app/db/database.py` defines `class Base(DeclarativeBase):` used by all models.
- Models use typed attributes with `Mapped` and `mapped_column`.
- Use `sqlalchemy.dialects.postgresql.UUID(as_uuid=True)` for primary UUIDs.
- Use `relationship(..., back_populates=...)` to define bidirectional relations.
- Avoid runtime circular imports by using `typing.TYPE_CHECKING` for type-only imports.
- Base model `app/shared/database/base_model.py` contains `id`, `created_at`, `updated_at` mapped columns.

## Pydantic v2 conventions
- Schemas use Pydantic v2 patterns (e.g., `.model_validate()`, `.model_dump()`).
- Application settings use `pydantic_settings.BaseSettings`.

## Dependency Injection
- DI via FastAPI `Depends()`.
- DB sessions provided by `app/db/session.py::get_db()` generator (yields a `Session` and closes it).
- Services and repositories are instantiated with explicit constructor injection (pass dependencies in constructors).

## Error Handling
- `AppException` (`app/core/exceptions/base.py`) is used for controlled domain errors.
- `register_exception_handlers` registers handlers: `AppException` → structured JSON; fallback `Exception` → 500 with generic message.
- Services and repositories raise `HTTPException` or `AppException` for expected error flows.

## Storage Architecture
- `app/storage/interfaces.py` defines `StorageProvider` abstract interface: `upload`, `delete`, `exists`, `generate_public_url`.
- `StorageService` validates files (size, extension, mime) and delegates upload/delete to a provider implementation; it returns `StorageUploadResult` DTOs.
- Storage configuration (Cloudflare R2) exists in settings; provider implementations are pluggable.

## Assets Architecture
- `app/assets/model.py` defines `Asset` mapped to `assets` table.
- Asset fields: `owner_id` (FK to `users.id`), `storage_key`, `original_filename`, `content_type`, `size`, `folder` (uses `StorageFolder` enum), `is_public`.
- `Asset.owner` relationship back-populates to `User.assets`.
- Physical public URL generation is provided by storage provider — not stored in DB.

## Coding Standards
- Use `from __future__ import annotations` and modern typing.
- Prefer explicit type hints and return annotations on all public functions and methods.
- Use docstrings on modules, classes, and public methods.
- Keep functions small and focused.

## Naming Conventions
- snake_case for functions, variables, and module-level names.
- PascalCase for classes.
- Table names are set via `__tablename__` in models (plural nouns used in the codebase).

## Timezone Rules
- Use timezone-aware datetimes in UTC for `created_at` and `updated_at` (project uses `datetime.now(UTC)`).
- Persist timezone-aware DateTime columns.

## Repository Rules
- Repositories own DB commits/refresh for created/updated objects.
- Extend `BaseRepository` for domain-specific queries; do not duplicate basic CRUD logic.
- Keep query methods small and deterministic.

## Service Rules
- Enforce business validation in service methods (authorization checks, uniqueness checks, cross-entity validation).
- Services may call multiple repositories but should not manipulate sessions directly beyond using repositories.
- Raise `HTTPException` or `AppException` for expected failures.

## Router Rules
- Routers define HTTP endpoints and call services; minimal business logic in routers.
- Use FastAPI `Depends` for injecting services/repositories/session objects.
- Return Pydantic response models where appropriate.

## Alembic Rules
- `migrations/env.py` currently imports all models so Alembic can discover metadata — keep any new model imports in `env.py` when needed for autogenerate.
- Do not modify existing migration files; create new migration scripts for model/schema changes.

## Testing Rules
- Tests are organized per domain under `tests/`.
- When adding model changes, update or add tests and generate corresponding Alembic migrations.

---

This guide documents the current repository architecture and conventions. Follow these rules to stay consistent with the existing codebase.
