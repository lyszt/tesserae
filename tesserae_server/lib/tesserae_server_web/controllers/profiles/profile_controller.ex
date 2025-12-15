defmodule TesseraeServerWeb.Profile.ProfileController do
  use TesseraeServerWeb, :controller
  alias TesseraeServer.Profiles
  alias TesseraeServer.Tokens

  def get_profile_by_id(conn, params) do
    # Get current user from token if present
    current_username = case get_req_header(conn, "authorization") do
      ["Bearer " <> token_hash] ->
        case Tokens.get_token_by_hash(token_hash) do
          {:ok, token} ->
            if Tokens.valid_token?(token) do
              token.account.username
            else
              nil
            end
          _ -> nil
        end
      _ -> nil
    end

    cond do
      !is_nil(params["username"]) ->
        username = params["username"]
        case Profiles.get_profile_by_username(username) do
          nil ->
            conn
            |> put_status(:not_found)
            |> json(%{
              errors: "User with username #{username} hasn't been found or does not exist."
            })

          profile ->
            is_owner = current_username == username
            conn
            |> put_status(:ok)
            |> json(%{profile: profile, is_owner: is_owner})
        end

      !is_nil(params["userId"]) ->
        userId = String.to_integer(params["userId"])
        case Profiles.get_profile_by_account_id(userId) do
          nil ->
            conn
            |> put_status(:not_found)
            |> json(%{
              errors: "User with id #{userId} hasn't been found or does not exist."
            })

          profile ->
            is_owner = current_username != nil && current_username == String.to_integer(userId)
            conn
            |> put_status(:ok)
            |> json(%{profile: profile, is_owner: is_owner})
        end

      true ->
        conn
        |> put_status(:bad_request)
        |> json(%{errors: "Must provide either username or userId parameter."})
    end
  end
end
