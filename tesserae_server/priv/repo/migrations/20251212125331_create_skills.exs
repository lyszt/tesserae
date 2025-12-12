defmodule TesseraeServer.Repo.Migrations.CreateSkills do
  use Ecto.Migration

  def change do
    create table(:skills) do
      add :profile_id, references(:profiles, on_delete: :delete_all), null: false

      add :name, :string, null: false
      add :proficiency_level, :string  # Beginner, Intermediate, Advanced, Expert
      add :years_of_experience, :integer

      timestamps()
    end

    create index(:skills, [:profile_id])
  end
end
