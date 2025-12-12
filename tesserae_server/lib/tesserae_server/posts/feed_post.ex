defmodule TesseraeServer.Posts.FeedPost do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.Accounts.Account
  alias TesseraeServer.Posts.{Comment, Like}
  alias TesseraeServer.Profiles.Company

  schema "feed_posts" do
    field :content, :string

    belongs_to :account, Account  # Author of the post
    belongs_to :company, Company  # Optional: if posted on behalf of company
    has_many :comments, Comment
    has_many :likes, Like

    timestamps()
  end

  @doc false
  def changeset(feed_post, attrs) do
    feed_post
    |> cast(attrs, [:content, :account_id, :company_id])
    |> validate_required([:content, :account_id])
    |> validate_length(:content, min: 1, max: 10000)
    |> foreign_key_constraint(:account_id)
    |> foreign_key_constraint(:company_id)
  end
end
