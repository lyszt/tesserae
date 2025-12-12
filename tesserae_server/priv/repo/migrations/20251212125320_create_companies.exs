defmodule TesseraeServer.Repo.Migrations.CreateCompanies do
  use Ecto.Migration

  def change do
    create table(:companies) do
      add :name, :string, null: false
      add :industry, :string
      add :website, :string
      add :description, :text
      add :location, :string
      add :size, :string
      add :logo_url, :string

      timestamps()
    end

    create unique_index(:companies, [:name])
  end
end
