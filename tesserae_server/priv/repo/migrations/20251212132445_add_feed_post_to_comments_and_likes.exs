defmodule TesseraeServer.Repo.Migrations.AddFeedPostToCommentsAndLikes do
  use Ecto.Migration

  def change do
    # Add feed_post_id to comments
    alter table(:comments) do
      add :feed_post_id, references(:feed_posts, on_delete: :delete_all)
    end

    create index(:comments, [:feed_post_id])

    # Drop old post_id constraint and add new one that allows either post or feed_post
    drop constraint(:comments, "comments_post_id_fkey")

    alter table(:comments) do
      modify :post_id, references(:posts, on_delete: :delete_all), null: true
    end

    # Add check constraint to ensure either post_id or feed_post_id is set
    create constraint(:comments, :post_or_feed_post_check,
      check: "(post_id IS NOT NULL AND feed_post_id IS NULL) OR (post_id IS NULL AND feed_post_id IS NOT NULL)")

    # Add feed_post_id to likes
    alter table(:likes) do
      add :feed_post_id, references(:feed_posts, on_delete: :delete_all)
    end

    create index(:likes, [:feed_post_id])

    # Drop old constraint and add new one
    drop constraint(:likes, :post_or_comment_check)

    # Add new check constraint for likes
    create constraint(:likes, :like_target_check,
      check: "(post_id IS NOT NULL AND comment_id IS NULL AND feed_post_id IS NULL) OR " <>
             "(post_id IS NULL AND comment_id IS NOT NULL AND feed_post_id IS NULL) OR " <>
             "(post_id IS NULL AND comment_id IS NULL AND feed_post_id IS NOT NULL)")

    # Add unique indexes for feed_post likes
    create unique_index(:likes, [:account_id, :feed_post_id], where: "feed_post_id IS NOT NULL")
  end
end
