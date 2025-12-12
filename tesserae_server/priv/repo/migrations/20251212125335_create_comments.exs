defmodule TesseraeServer.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :account_id, references(:accounts, on_delete: :delete_all), null: false
      add :post_id, references(:posts, on_delete: :delete_all), null: false
      add :parent_comment_id, references(:comments, on_delete: :delete_all)

      add :content, :text, null: false

      timestamps()
    end

    create index(:comments, [:account_id])
    create index(:comments, [:post_id])
    create index(:comments, [:parent_comment_id])
  end
end
