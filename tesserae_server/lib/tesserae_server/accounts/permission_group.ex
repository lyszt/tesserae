defmodule TesseraeServer.Accounts.PermissionGroup do
  use Ecto.Schema
  import Ecto.Changeset

  @derive {Jason.Encoder, except: [ :accounts ]}

  schema "permission_groups" do
    field :name, :string
    field :description, :string
    field :permissions, {:array, :string}, default: []

    has_many :accounts, TesseraeServer.Accounts.Account

    timestamps()
  end

  @doc false
  def changeset(permission_group, attrs) do
    permission_group
    |> cast(attrs, [:name, :description, :permissions])
    |> validate_required([:name])
    |> unique_constraint(:name)
    |> validate_permissions()
  end

  defp validate_permissions(changeset) do
    case get_field(changeset, :permissions) do
      nil ->
        changeset
      permissions when is_list(permissions) ->
        if Enum.all?(permissions, &is_binary/1) do
          changeset
        else
          add_error(changeset, :permissions, "must be a list of strings")
        end
      _ ->
        add_error(changeset, :permissions, "must be a list")
    end
  end
end
