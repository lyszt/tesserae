defmodule TesseraeServer.Repo.Migrations.CreateArticleAuthors do
  use Ecto.Migration

  def change do
    create table(:article_authors) do
      add :article_id, references(:articles, on_delete: :delete_all), null: false
      add :profile_id, references(:profiles, on_delete: :delete_all), null: false
      add :author_order, :integer  # For ordering co-authors

      timestamps()
    end

    create index(:article_authors, [:article_id])
    create index(:article_authors, [:profile_id])
    create unique_index(:article_authors, [:article_id, :profile_id])
  end
end
