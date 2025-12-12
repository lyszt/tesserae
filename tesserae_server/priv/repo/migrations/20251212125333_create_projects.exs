defmodule TesseraeServer.Repo.Migrations.CreateProjects do
  use Ecto.Migration

  def change do
    create table(:projects) do
      add :profile_id, references(:profiles, on_delete: :delete_all), null: false

      add :title, :string, null: false
      add :description, :text
      add :url, :string
      add :repository_url, :string
      add :start_date, :date
      add :end_date, :date
      add :is_ongoing, :boolean, default: false
      add :technologies, {:array, :string}  # Array of tech stack

      timestamps()
    end

    create index(:projects, [:profile_id])
  end
end
