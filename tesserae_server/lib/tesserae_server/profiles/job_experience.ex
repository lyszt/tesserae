defmodule TesseraeServer.Profiles.JobExperience do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.Accounts.Profile
  alias TesseraeServer.Profiles.Company

  schema "job_experiences" do
    field :title, :string
    field :company_name, :string  # Fallback if no company entity
    field :location, :string
    field :employment_type, :string
    field :start_date, :date
    field :end_date, :date
    field :is_current, :boolean, default: false
    field :description, :string

    belongs_to :profile, Profile
    belongs_to :company, Company

    timestamps()
  end

  @doc false
  def changeset(job_experience, attrs) do
    job_experience
    |> cast(attrs, [
      :title,
      :company_name,
      :location,
      :employment_type,
      :start_date,
      :end_date,
      :is_current,
      :description,
      :profile_id,
      :company_id
    ])
    |> validate_required([:title, :start_date, :profile_id])
    |> validate_company_reference()
    |> validate_dates()
    |> foreign_key_constraint(:profile_id)
    |> foreign_key_constraint(:company_id)
  end

  defp validate_company_reference(changeset) do
    company_id = get_field(changeset, :company_id)
    company_name = get_field(changeset, :company_name)

    if !company_id && !company_name do
      add_error(changeset, :company_name, "either company_id or company_name must be provided")
    else
      changeset
    end
  end

  defp validate_dates(changeset) do
    start_date = get_field(changeset, :start_date)
    end_date = get_field(changeset, :end_date)
    is_current = get_field(changeset, :is_current)

    cond do
      is_current && end_date ->
        add_error(changeset, :end_date, "cannot have end_date when is_current is true")

      start_date && end_date && Date.compare(start_date, end_date) == :gt ->
        add_error(changeset, :end_date, "must be after start_date")

      true ->
        changeset
    end
  end
end
