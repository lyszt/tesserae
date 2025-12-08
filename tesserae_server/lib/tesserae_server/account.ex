defmodule TesseraeServer.Account do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.PermissionGroup

  schema "accounts" do
    field :username, :string
    field :email, :string
    field :password, :string
    field :provider, :string
    field :uuid, :string

    belongs_to :permission_group, PermissionGroup
    has_many :posts, TesseraeServer.Post

    timestamps()
  end

  @doc false
  def changeset(account, attrs) do
      account
      |> cast(attrs, [
        :username,
        :email,
        :password,
        :provider,
        :uuid,
        :permission_group_id
        ])
      |> validate_required([
          :username
        ])
      |> validate_provider_password()
      |> foreign_key_constraint(:permission_group_id)

  end
  defp validate_provider_password(changeset) do
    if get_field(changeset, :provider) do
        changeset
    else
      validate_required(changeset, [:password])
    end
  end
end
