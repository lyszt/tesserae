defmodule TesseraeServer.Repo.Migrations.CreateTokens do
  use Ecto.Migration

  def change do
    create table(:tokens) do
      add :hash, :string, null: false
      add :type, :string, null: false
      add :is_revoked, :boolean, default: false, null: false
      add :expires_at, :utc_datetime, null: false
      add :account_id, references(:accounts, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create unique_index(:tokens, [:hash])
    create index(:tokens, [:account_id])
    create index(:tokens, [:type])
    create index(:tokens, [:expires_at])
    create index(:tokens, [:is_revoked])
  end
end
