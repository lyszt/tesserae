defmodule TesseraeServer.Repo.Migrations.CreateLikes do
  use Ecto.Migration

  def change do
    create table(:likes) do
      add :account_id, references(:accounts, on_delete: :delete_all), null: false
      add :post_id, references(:posts, on_delete: :delete_all)
      add :comment_id, references(:comments, on_delete: :delete_all)

      timestamps()
    end

    create index(:likes, [:account_id])
    create index(:likes, [:post_id])
    create index(:likes, [:comment_id])

    # Ensure one account can only like a post/comment once
    create unique_index(:likes, [:account_id, :post_id], where: "post_id IS NOT NULL")
    create unique_index(:likes, [:account_id, :comment_id], where: "comment_id IS NOT NULL")

    # Ensure either post_id or comment_id is set, not both
    create constraint(:likes, :post_or_comment_check,
      check: "(post_id IS NOT NULL AND comment_id IS NULL) OR (post_id IS NULL AND comment_id IS NOT NULL)")
  end
end
