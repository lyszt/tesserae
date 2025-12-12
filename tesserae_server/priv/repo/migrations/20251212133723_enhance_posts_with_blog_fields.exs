defmodule TesseraeServer.Repo.Migrations.EnhancePostsWithBlogFields do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      # Media & URLs
      add :featured_image_url, :string
      add :external_url, :string
      add :canonical_url, :string

      # Technical/Stack information
      add :tags, {:array, :string}, default: []
      add :tech_stack, {:array, :string}, default: []

      # Reading & Metadata
      add :reading_time_minutes, :integer
      add :excerpt, :text  # Short summary/preview
      add :is_published, :boolean, default: false
      add :published_at, :utc_datetime

      # SEO
      add :slug, :string
      add :meta_description, :text
    end

    create unique_index(:posts, [:slug], where: "slug IS NOT NULL")
    create index(:posts, [:is_published])
    create index(:posts, [:published_at])
  end
end
