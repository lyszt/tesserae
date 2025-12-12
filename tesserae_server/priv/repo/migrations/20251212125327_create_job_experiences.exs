defmodule TesseraeServer.Repo.Migrations.CreateJobExperiences do
  use Ecto.Migration

  def change do
    create table(:job_experiences) do
      add :profile_id, references(:profiles, on_delete: :delete_all), null: false
      add :company_id, references(:companies, on_delete: :nilify_all)

      add :title, :string, null: false
      add :company_name, :string  # Fallback if no company_id
      add :location, :string
      add :employment_type, :string  # Full-time, Part-time, Contract, etc.
      add :start_date, :date, null: false
      add :end_date, :date
      add :is_current, :boolean, default: false
      add :description, :text

      timestamps()
    end

    create index(:job_experiences, [:profile_id])
    create index(:job_experiences, [:company_id])
  end
end
