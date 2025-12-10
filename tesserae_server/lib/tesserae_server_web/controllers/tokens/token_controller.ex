defmodule TesseraeServerWeb.Tokens.TokenController do
  use TesseraeServerWeb, :controller
  alias TesseraeServer.Accounts
  alias TesseraeServer.Tokens

  def validate(conn, params) do
    case get_req_header(conn, "authorization") do
      ["Bearer " <> token_hash] ->
        case Tokens.get_token_by_hash(token_hash) do
          {:ok, token} ->
              case Tokens.valid_token?(token) do
                true ->
                  conn
                  |> put_status(:ok)
                  |> json(%{valid: true})
                false ->
                  conn
                  |> put_status(:unauthorized)
                  |> json(%{errors: "Invalid token.", valid: false})

                _ ->
                  conn
                      |> put_status(:unauthorized)
                      |> json(%{errors: "Invalid authentication header.", valid: false})
                end
          _ ->
            conn
            |> put_status(:unauthorized)
            |> json(%{errors: "Invalid authentication header.", valid: false})

        end
    end
  end
end
