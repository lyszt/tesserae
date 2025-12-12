defmodule TesseraeServer.Profiles.Project do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.Accounts.Profile

  schema "projects" do
    field :title, :string
    field :description, :string
    field :url, :string
    field :repository_url, :string
    field :start_date, :date
    field :end_date, :date
    field :is_ongoing, :boolean, default: false
    field :technologies, {:array, :string}

    belongs_to :profile, Profile

    timestamps()
  end

  @doc false
  def changeset(project, attrs) do
    project
    |> cast(attrs, [
      :title,
      :description,
      :url,
      :repository_url,
      :start_date,
      :end_date,
      :is_ongoing,
      :technologies,
      :profile_id
    ])
    |> validate_required([:title, :profile_id])
    |> validate_url(:url)
    |> validate_url(:repository_url)
    |> validate_dates()
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

  defp validate_dates(changeset) do
    start_date = get_field(changeset, :start_date)
    end_date = get_field(changeset, :end_date)
    is_ongoing = get_field(changeset, :is_ongoing)

    cond do
      is_ongoing && end_date ->
        add_error(changeset, :end_date, "cannot have end_date when is_ongoing is true")

      start_date && end_date && Date.compare(start_date, end_date) == :gt ->
        add_error(changeset, :end_date, "must be after start_date")

      true ->
        changeset
    end
  end
end
