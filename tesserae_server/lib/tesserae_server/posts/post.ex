defmodule TesseraeServer.Posts.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.Accounts.Account
  alias TesseraeServer.Posts.{Comment, Like}
  alias TesseraeServer.Profiles.Company

  schema "posts" do
    belongs_to :account, Account
    belongs_to :company, Company

    # Core content
    field :title, :string
    field :description, :string
    field :body, :string
    field :excerpt, :string

    # Media & URLs
    field :featured_image_url, :string
    field :external_url, :string
    field :canonical_url, :string

    # Technical/Stack information
    field :tags, {:array, :string}, default: []
    field :tech_stack, {:array, :string}, default: []

    # Reading & Metadata
    field :reading_time_minutes, :integer
    field :is_published, :boolean, default: false
    field :published_at, :utc_datetime
    field :status, Ecto.Enum, values: [:draft, :published, :hidden, :archived, :flagged], default: :draft

    # SEO
    field :slug, :string
    field :meta_description, :string

    # Moderation
    field :report_count, :integer, default: 0

    has_many :comments, Comment
    has_many :likes, Like

    # Academic justification/references
    many_to_many :academic_articles, TesseraeServer.Profiles.AcademicArticle,
      join_through: "post_academic_articles"

    timestamps()

  end

  @doc false
  def changeset(blog_post, attrs) do
    blog_post
    |> cast(attrs, [
      :title,
      :body,
      :description,
      :excerpt,
      :featured_image_url,
      :external_url,
      :canonical_url,
      :tags,
      :tech_stack,
      :reading_time_minutes,
      :is_published,
      :published_at,
      :status,
      :slug,
      :meta_description,
      :account_id,
      :company_id
    ])
    |> validate_required([:title, :body, :account_id])
    |> validate_url(:featured_image_url)
    |> validate_url(:external_url)
    |> validate_url(:canonical_url)
    |> validate_slug()
    |> validate_inclusion(:status, [:draft, :published, :hidden, :archived, :flagged])
    |> unique_constraint(:slug)
    |> foreign_key_constraint(:account_id)
    |> foreign_key_constraint(:company_id)
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

  defp validate_slug(changeset) do
    case get_change(changeset, :slug) do
      nil ->
        changeset

      slug ->
        if String.match?(slug, ~r/^[a-z0-9-]+$/) do
          changeset
        else
          add_error(changeset, :slug, "must contain only lowercase letters, numbers, and hyphens")
        end
    end
  end
end
