defmodule TesseraeServer.Posts.Comment do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.Accounts.Account
  alias TesseraeServer.Posts.{Post, FeedPost}

  schema "comments" do
    field :content, :string

    belongs_to :account, Account
    belongs_to :post, Post
    belongs_to :feed_post, FeedPost
    belongs_to :parent_comment, __MODULE__  # For nested replies
    has_many :replies, __MODULE__, foreign_key: :parent_comment_id

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [
      :content,
      :account_id,
      :post_id,
      :feed_post_id,
      :parent_comment_id
    ])
    |> validate_required([:content, :account_id])
    |> validate_comment_target()
    |> validate_length(:content, min: 1, max: 5000)
    |> foreign_key_constraint(:account_id)
    |> foreign_key_constraint(:post_id)
    |> foreign_key_constraint(:feed_post_id)
    |> foreign_key_constraint(:parent_comment_id)
  end

  defp validate_comment_target(changeset) do
    post_id = get_field(changeset, :post_id)
    feed_post_id = get_field(changeset, :feed_post_id)

    cond do
      post_id && feed_post_id ->
        add_error(changeset, :base, "cannot comment on both post and feed_post")

      !post_id && !feed_post_id ->
        add_error(changeset, :base, "must comment on either a post or feed_post")

      true ->
        changeset
    end
  end
end
