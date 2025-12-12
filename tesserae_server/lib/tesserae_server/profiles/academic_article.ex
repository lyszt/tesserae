defmodule TesseraeServer.Profiles.AcademicArticle do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.Accounts.Profile

  schema "academic_articles" do
    field :title, :string
    field :external_authors, :string
    field :journal, :string
    field :publication_date, :date
    field :doi, :string
    field :url, :string
    field :abstract, :string
    field :citation_count, :integer, default: 0

    belongs_to :profile, Profile
    many_to_many :co_authors, Profile, join_through: "academic_article_authors"

    # Posts that reference this academic article
    many_to_many :posts, TesseraeServer.Posts.Post, join_through: "post_academic_articles"

    timestamps()
  end

  @doc false
  def changeset(academic_article, attrs) do
    academic_article
    |> cast(attrs, [
      :title,
      :external_authors,
      :journal,
      :publication_date,
      :doi,
      :url,
      :abstract,
      :citation_count,
      :profile_id
    ])
    |> validate_required([:title, :profile_id])
    |> validate_url(:url)
    |> foreign_key_constraint(:profile_id)
  end

  defp validate_url(changeset, field) do
    validate_change(changeset, field, fn _, url ->
      if url && !String.match?(url, ~r/^https?:\/\/.+/) do
        [{field, "must be a valid URL starting with http:// or https://"}]
      else
        []
      end
    end)
  end
end
