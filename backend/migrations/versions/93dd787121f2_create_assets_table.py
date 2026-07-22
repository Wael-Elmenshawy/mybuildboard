"""create assets table

Revision ID: 93dd787121f2
Revises: 211f8df6436a
Create Date: 2026-07-21

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = "93dd787121f2"
down_revision: Union[str, Sequence[str], None] = "211f8df6436a"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


storage_folder = postgresql.ENUM(
    "avatars",
    "projects",
    "certificates",
    "achievements",
    "resumes",
    "boards",
    name="storage_folder",
    create_type=False,
)


def upgrade() -> None:
    op.execute(
        """
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1
                FROM pg_type
                WHERE typname = 'storage_folder'
            ) THEN
                CREATE TYPE storage_folder AS ENUM (
                    'avatars',
                    'projects',
                    'certificates',
                    'achievements',
                    'resumes',
                    'boards'
                );
            END IF;
        END
        $$;
        """
    )

    op.create_table(
        "assets",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            nullable=False,
        ),
        sa.Column(
            "owner_id",
            postgresql.UUID(as_uuid=True),
            nullable=False,
        ),
        sa.Column(
            "storage_key",
            sa.String(length=512),
            nullable=False,
        ),
        sa.Column(
            "original_filename",
            sa.String(length=255),
            nullable=False,
        ),
        sa.Column(
            "content_type",
            sa.String(length=100),
            nullable=False,
        ),
        sa.Column(
            "size",
            sa.BigInteger(),
            nullable=False,
        ),
        sa.Column(
            "folder",
            storage_folder,
            nullable=False,
        ),
        sa.Column(
            "is_public",
            sa.Boolean(),
            nullable=False,
            server_default=sa.true(),
        ),
        sa.ForeignKeyConstraint(
            ["owner_id"],
            ["users.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint(
            "storage_key",
            name="uq_assets_storage_key",
        ),
    )

    op.create_index(
        "ix_assets_owner_id",
        "assets",
        ["owner_id"],
        unique=False,
    )

    op.create_index(
        "ix_assets_folder",
        "assets",
        ["folder"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_assets_folder",
        table_name="assets",
    )

    op.drop_index(
        "ix_assets_owner_id",
        table_name="assets",
    )

    op.drop_table("assets")

    op.execute("DROP TYPE IF EXISTS storage_folder")
