defmodule TesseraeServer.Tokens do
  import Ecto.Query, warn: false
  alias TesseraeServer.Repo
  alias TesseraeServer.Tokens.Token
  alias TesseraeServer.Accounts.Account


  def list_tokens do
    Repo.all(Token)
    |> Repo.preload(:account)
  end

  @doc """
  Returns the list of tokens for a specific account.
  """
  def list_tokens_for(%Account{} = account) do
    Token
    |> where([t], t.account_id == ^account.id)
    |> Repo.all()
  end

  def list_tokens_for(account_id) when is_integer(account_id) do
    Token
    |> where([t], t.account_id == ^account_id)
    |> Repo.all()
  end

  @doc """
  Gets a single token.
  """
  def get_token!(id) do
    Repo.get!(Token, id)
    |> Repo.preload(:account)
  end

  def get_token_by_hash(hash) do
    Token
    |> where([t], t.hash == ^hash)
    |> where([t], t.is_revoked == false)
    |> Repo.one()
    |> case do
      nil -> nil
      token -> Repo.preload(token, :account)
    end
  end

  @doc """
  Creates a token.
  """
  def create_token(attrs \\ %{}) do
    %Token{}
    |> Token.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a token.
  """
  def update_token(%Token{} = token, attrs) do
    token
    |> Token.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a token.
  """
  def delete_token(%Token{} = token) do
    Repo.delete(token)
  end

  @doc """
  Revokes a token
  """
  def revoke_token(%Token{} = token) do
    token
    |> Token.changeset(%{is_revoked: true})
    |> Repo.update()
  end

  @doc """
  Revokes all tokens for a given account.
  """
  def revoke_all_tokens_for(%Account{} = account) do
    Token
    |> where([t], t.account_id == ^account.id)
    |> where([t], t.is_revoked == false)
    |> Repo.update_all(set: [is_revoked: true])
  end

  def revoke_all_tokens_for(account_id) when is_integer(account_id) do
    Token
    |> where([t], t.account_id == ^account_id)
    |> where([t], t.is_revoked == false)
    |> Repo.update_all(set: [is_revoked: true])
  end

  @doc """
  Deletes expired tokens.
  """
  def delete_expired_tokens do
    now = DateTime.utc_now()

    Token
    |> where([t], t.expires_at < ^now)
    |> Repo.delete_all()
  end

  @doc """
  Checks if a token is valid (not revoked and not expired).
  """
  def valid_token?(%Token{} = token) do
    now = DateTime.utc_now()
    not token.is_revoked and DateTime.compare(token.expires_at, now) == :gt
  end



  def generate_token do
    :crypto.strong_rand_bytes(32)
    |> Base.url_encode64(padding: false)
  end


  def create_token_for(account_or_id, type, expires_in_opts \\ [hours: 24])

  def create_token_for(%Account{} = account, type, expires_in_opts) do
    hash = generate_token()
    expires_at = DateTime.utc_now() |> DateTime.add(Keyword.get(expires_in_opts, :hours, 24) * 3600, :second)

    create_token(%{
      hash: hash,
      type: type,
      account_id: account.id,
      expires_at: expires_at
    })
  end

  def create_token_for(account_id, type, expires_in_opts) when is_integer(account_id) do
    hash = generate_token()
    expires_at = DateTime.utc_now() |> DateTime.add(Keyword.get(expires_in_opts, :hours, 24) * 3600, :second)

    create_token(%{
      hash: hash,
      type: type,
      account_id: account_id,
      expires_at: expires_at
    })
  end
end
