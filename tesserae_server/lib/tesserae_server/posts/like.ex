defmodule TesseraeServer.Posts.Like do
  use Ecto.Schema
  import Ecto.Changeset
  alias TesseraeServer.Accounts.Account
  alias TesseraeServer.Posts.{Post, Comment, FeedPost}

  schema "likes" do
    belongs_to :account, Account
    belongs_to :post, Post
    belongs_to :comment, Comment
    belongs_to :feed_post, FeedPost

    timestamps()
  end

  @doc false
  def changeset(like, attrs) do
    like
    |> cast(attrs, [
      :account_id,
      :post_id,
      :comment_id,
      :feed_post_id
    ])
    |> validate_required([:account_id])
    |> validate_like_target()
    |> unique_constraint([:account_id, :post_id])
    |> unique_constraint([:account_id, :comment_id])
    |> unique_constraint([:account_id, :feed_post_id])
    |> foreign_key_constraint(:account_id)
    |> foreign_key_constraint(:post_id)
    |> foreign_key_constraint(:comment_id)
    |> foreign_key_constraint(:feed_post_id)
  end

  defp validate_like_target(changeset) do
    post_id = get_field(changeset, :post_id)
    comment_id = get_field(changeset, :comment_id)
    feed_post_id = get_field(changeset, :feed_post_id)

    targets = [post_id, comment_id, feed_post_id] |> Enum.filter(& &1)

    cond do
      length(targets) > 1 ->
        add_error(changeset, :base, "cannot like multiple targets")

      length(targets) == 0 ->
        add_error(changeset, :base, "must like either a post, comment, or feed_post")

      true ->
        changeset
    end
  end
end
