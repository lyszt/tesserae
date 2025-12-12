defmodule TesseraeServer.Repo.Migrations.CreateProfiles do
  use Ecto.Migration

  def change do
    create table(:profiles) do
      add :account_id, references(:accounts, on_delete: :delete_all), null: false

      # Basic Info
      add :fullname, :string
      add :headline, :string
      add :bio, :text
      add :location, :string

      # Contact & Social
      add :phone, :string
      add :website, :string
      add :linkedin_url, :string
      add :github_url, :string

      # Academic & Research
      add :research_interests, :text
      add :orcid_id, :string
      add :google_scholar_url, :string
      add :researchgate_url, :string

      timestamps()
    end

    create unique_index(:profiles, [:account_id])
  end
end
