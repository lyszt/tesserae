defmodule TesseraeServer.Repo.Migrations.CreateFeedPosts do
  use Ecto.Migration

  def change do
    create table(:feed_posts) do
      add :account_id, references(:accounts, on_delete: :delete_all), null: false
      add :company_id, references(:companies, on_delete: :delete_all)
      add :content, :text, null: false

      timestamps()
    end

    create index(:feed_posts, [:account_id])
    create index(:feed_posts, [:company_id])
  end
end
