defmodule TesseraeServer.Profiles.Company do
  use Ecto.Schema
  import Ecto.Changeset

  schema "companies" do
    field :name, :string
    field :industry, :string
    field :website, :string
    field :description, :string
    field :location, :string
    field :size, :string
    field :logo_url, :string

    has_many :job_experiences, TesseraeServer.Profiles.JobExperience
    has_many :posts, TesseraeServer.Posts.Post
    has_many :feed_posts, TesseraeServer.Posts.FeedPost

    timestamps()
  end

  @doc false
  def changeset(company, attrs) do
    company
    |> cast(attrs, [
      :name,
      :industry,
      :website,
      :description,
      :location,
      :size,
      :logo_url
    ])
    |> validate_required([:name])
    |> validate_url(:website)
    |> unique_constraint(:name)
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
