defmodule TesseraeServer.Repo.Migrations.AddAcademicArticleToPosts do
  use Ecto.Migration

  def change do
    create table(:post_academic_articles) do
      add :post_id, references(:posts, on_delete: :delete_all), null: false
      add :academic_article_id, references(:academic_articles, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:post_academic_articles, [:post_id])
    create index(:post_academic_articles, [:academic_article_id])
    create unique_index(:post_academic_articles, [:post_id, :academic_article_id])
  end
end
