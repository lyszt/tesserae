defmodule TesseraeServer.Repo.Migrations.AddStatusToPostsAndFeedPosts do
  use Ecto.Migration

  def change do
    # Create enum type for post status
    execute(
      "CREATE TYPE post_status AS ENUM ('draft', 'published', 'hidden', 'archived', 'flagged')",
      "DROP TYPE post_status"
    )

    alter table(:posts) do
      add :status, :post_status, default: "draft", null: false
    end

    alter table(:feed_posts) do
      add :status, :post_status, default: "published", null: false
    end

    create index(:posts, [:status])
    create index(:feed_posts, [:status])

    # Migrate existing posts: if is_published = true, set status to 'published', else 'draft'
    execute(
      "UPDATE posts SET status = CASE WHEN is_published THEN 'published'::post_status ELSE 'draft'::post_status END",
      ""
    )
  end
end
