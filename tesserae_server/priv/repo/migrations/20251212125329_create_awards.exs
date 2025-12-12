defmodule TesseraeServer.Repo.Migrations.CreateAwards do
  use Ecto.Migration

  def change do
    create table(:awards) do
      add :profile_id, references(:profiles, on_delete: :delete_all), null: false

      add :title, :string, null: false
      add :issuer, :string
      add :date_received, :date
      add :description, :text

      timestamps()
    end

    create index(:awards, [:profile_id])
  end
end
