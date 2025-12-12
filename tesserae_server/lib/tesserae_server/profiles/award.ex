defmodule TesseraeServer.Profiles.Award do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.Accounts.Profile

  schema "awards" do
    field :title, :string
    field :issuer, :string
    field :date_received, :date
    field :description, :string

    belongs_to :profile, Profile

    timestamps()
  end

  @doc false
  def changeset(award, attrs) do
    award
    |> cast(attrs, [
      :title,
      :issuer,
      :date_received,
      :description,
      :profile_id
    ])
    |> validate_required([:title, :profile_id])
    |> foreign_key_constraint(:profile_id)
  end
end
