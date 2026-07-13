"""create boards table

Revision ID: a58df641d6de
Revises: f4055d32fb3d
Create Date: 2026-07-13 00:33:59.872672

"""

from collections.abc import Sequence

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "a58df641d6de"
down_revision = "f4055d32fb3d"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "boards",
        sa.Column("owner_id", sa.UUID(), nullable=False),
        sa.Column("title", sa.String(length=150), nullable=False),
        sa.Column("slug", sa.String(length=150), nullable=False),
        sa.Column("description", sa.String(length=1000), nullable=True),
        sa.Column(
            "visibility",
            sa.Enum(
                "public",
                "private",
                "unlisted",
                name="boardvisibility",
            ),
            nullable=False,
        ),
        sa.Column(
            "status",
            sa.Enum(
                "active",
                "archived",
                "draft",
                name="boardstatus",
            ),
            nullable=False,
        ),
        sa.Column("is_featured", sa.Boolean(), nullable=False),
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(
            ["owner_id"],
            ["users.id"],
            ondelete="CASCADE",
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        op.f("ix_boards_owner_id"),
        "boards",
        ["owner_id"],
        unique=False,
    )

    op.create_index(
        op.f("ix_boards_slug"),
        "boards",
        ["slug"],
        unique=True,
    )


def downgrade() -> None:
    op.drop_index(
        op.f("ix_boards_slug"),
        table_name="boards",
    )

    op.drop_index(
        op.f("ix_boards_owner_id"),
        table_name="boards",
    )

    op.drop_table("boards")