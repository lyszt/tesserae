defmodule TesseraeServer.Accounts.Profile do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.Accounts.Account
  alias TesseraeServer.Profiles.{AcademicArticle, JobExperience, Award, Skill, Project}

  @derive {Jason.Encoder, except: [ :account ]}


  schema "profiles" do
    # Basic Info
    field :fullname, :string
    field :headline, :string
    field :bio, :string
    field :location, :string

    # Contact & Social
    field :phone, :string
    field :website, :string
    field :linkedin_url, :string
    field :github_url, :string

    # Academic & Research
    field :research_interests, :string
    field :orcid_id, :string
    field :google_scholar_url, :string
    field :researchgate_url, :string

    belongs_to :account, Account

    # Profile-specific associations
    has_many :academic_articles, AcademicArticle, foreign_key: :profile_id
    has_many :job_experiences, JobExperience
    has_many :awards, Award
    has_many :skills, Skill
    has_many :projects, Project

    # Co-authored articles (many-to-many)
    many_to_many :co_authored_articles, AcademicArticle, join_through: "academic_article_authors"

    timestamps()
  end

  @doc false
  def changeset(profile, attrs) do
    profile
    |> cast(attrs, [
      :fullname,
      :headline,
      :bio,
      :location,
      :phone,
      :website,
      :linkedin_url,
      :github_url,
      :research_interests,
      :orcid_id,
      :google_scholar_url,
      :researchgate_url,
      :account_id
    ])
    |> validate_url(:website)
    |> validate_url(:linkedin_url)
    |> validate_url(:github_url)
    |> validate_url(:google_scholar_url)
    |> validate_url(:researchgate_url)
    |> foreign_key_constraint(:account_id)
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
