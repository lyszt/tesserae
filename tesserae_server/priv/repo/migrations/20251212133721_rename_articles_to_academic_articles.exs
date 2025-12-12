defmodule TesseraeServer.Repo.Migrations.RenameArticlesToAcademicArticles do
  use Ecto.Migration

  def change do
    # Rename the tables
    rename table(:articles), to: table(:academic_articles)
    rename table(:article_authors), to: table(:academic_article_authors)

    # Update foreign key column names in the join table
    execute(
      "ALTER TABLE academic_article_authors RENAME COLUMN article_id TO academic_article_id",
      "ALTER TABLE academic_article_authors RENAME COLUMN academic_article_id TO article_id"
    )

    # Drop old indexes
    drop index(:academic_articles, [:profile_id], name: :articles_profile_id_index)
    drop index(:academic_article_authors, [:article_id], name: :article_authors_article_id_index)
    drop index(:academic_article_authors, [:profile_id], name: :article_authors_profile_id_index)
    drop unique_index(:academic_article_authors, [:article_id, :profile_id], name: :article_authors_article_id_profile_id_index)

    # Create new indexes with proper names
    create index(:academic_articles, [:profile_id])
    create index(:academic_article_authors, [:academic_article_id])
    create index(:academic_article_authors, [:profile_id])
    create unique_index(:academic_article_authors, [:academic_article_id, :profile_id])
  end
end
