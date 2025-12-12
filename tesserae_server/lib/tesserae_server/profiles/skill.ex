defmodule TesseraeServer.Profiles.Skill do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.Accounts.Profile

  @proficiency_levels ["Beginner", "Intermediate", "Advanced", "Expert"]

  schema "skills" do
    field :name, :string
    field :proficiency_level, :string
    field :years_of_experience, :integer

    belongs_to :profile, Profile

    timestamps()
  end

  @doc false
  def changeset(skill, attrs) do
    skill
    |> cast(attrs, [
      :name,
      :proficiency_level,
      :years_of_experience,
      :profile_id
    ])
    |> validate_required([:name, :profile_id])
    |> validate_inclusion(:proficiency_level, @proficiency_levels)
    |> validate_number(:years_of_experience, greater_than_or_equal_to: 0)
    |> foreign_key_constraint(:profile_id)
  end
end
