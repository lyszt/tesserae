defmodule TesseraeServer.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :title, :string
      add :description, :string
      add :body, :text
      add :account_id, references(:accounts, on_delete: :delete_all)
      timestamps()
    end

  create index(:posts, [:account_id])

  end
end
