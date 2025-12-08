defmodule TesseraeServerWeb.AccountController do
  use TesseraeServerWeb, :controller
  alias TesseraeServer.Accounts

  def create(conn, params) do
    # Creates an account in the server
    case Accounts.create_account(params) do
      {:ok, account} ->
        conn
        |> put_status(:created)
        |> render(:show, account: account)

      {:error, changeset} ->
        errors = Ecto.Changeset.traverse_errors(changeset, fn {msg, _opts} -> msg end)

        conn
        |> put_status(:bad_request)
        |> json(%{errors: errors})
    end
  end


end
