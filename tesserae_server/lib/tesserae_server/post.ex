defmodule TesseraeServer.Post do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.Account

  schema "posts" do
    belongs_to :account, Account

    field :title, :string
    field :description, :string
    field :body, :string
    timestamps()

  end

  @doc false
  def changeset(blog_post, attrs) do
    blog_post
    |> cast(attrs, [:title, :body, :account_id])
    |> validate_required([:title, :body, :account_id])
  end
end
