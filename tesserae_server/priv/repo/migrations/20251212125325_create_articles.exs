defmodule TesseraeServer.Repo.Migrations.CreateArticles do
  use Ecto.Migration

  def change do
    create table(:articles) do
      add :profile_id, references(:profiles, on_delete: :delete_all), null: false

      add :title, :string, null: false
      add :external_authors, :text  # For non-profile authors (plain text)
      add :journal, :string
      add :publication_date, :date
      add :doi, :string
      add :url, :string
      add :abstract, :text
      add :citation_count, :integer, default: 0

      timestamps()
    end

    create index(:articles, [:profile_id])
  end
end
