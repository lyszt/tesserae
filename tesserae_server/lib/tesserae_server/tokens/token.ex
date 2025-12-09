defmodule TesseraeServer.Posts.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.Accounts.Account

  schema "posts" do
    belongs_to :account, Account

    field :hash, :string
    field :type, :string
    field :is_revoked, :boolean
    field :expires_at, :utc_datetime
    field :created_at, :utc_datetime


  end

  @doc false
  def changeset(blog_post, attrs) do
    blog_post
    |> cast(attrs, [:hash, :type, :is_revoked, :expires_at, :created_at])
    |> validate_required([:hash, :type, :is_revoked, :expires_at, :created_at])
  end
end
