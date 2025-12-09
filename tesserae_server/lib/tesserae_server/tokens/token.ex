defmodule TesseraeServer.Tokens.Token do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.Accounts.Account

  schema "tokens" do
    field :hash, :string
    field :type, :string
    field :is_revoked, :boolean, default: false
    field :expires_at, :utc_datetime

    belongs_to :account, Account

    timestamps(type: :utc_datetime)
  end

  @doc false
  def changeset(token, attrs) do
    token
    |> cast(attrs, [:hash, :type, :is_revoked, :expires_at, :account_id])
    |> validate_required([:hash, :type, :account_id])
    |> validate_inclusion(:type, ["access", "refresh"])
    |> unique_constraint(:hash)
    |> foreign_key_constraint(:account_id)
  end
end
