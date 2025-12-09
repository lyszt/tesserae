defmodule TesseraeServerWeb.Accounts.AccountController do
  use TesseraeServerWeb, :controller
  alias TesseraeServer.Accounts
  alias TesseraeServer.Tokens

  def create(conn, params) do
    # Creates an account in the server
    cond do
      is_nil(params) ->
        conn
        |> put_status(:bad_request)
        |> json(%{errors: "O formulário não pode estar vazio."})

      is_nil(params["username"]) ->
        conn
        |> put_status(:bad_request)
        |> json(%{errors: "O campo de usuário não pode estar vazio."})

      is_nil(params["email"]) ->
        conn
        |> put_status(:bad_request)
        |> json(%{errors: "O campo de email não pode estar vazio."})

      is_nil(params["password"]) ->
        conn
        |> put_status(:bad_request)
        |> json(%{errors: "O campo de senha não pode estar vazio."})

      String.length(params["password"]) > 1 ->
        password = Argon2.hash_pwd_salt(params["password"])

        user_params = %{
          username: params["username"],
          email: params["email"],
          password: password
        }

        create_with_params(conn, user_params)

      is_binary(params["provider"]) && is_binary(params["uuid"]) ->
        user_params = %{
          username: params["username"],
          email: params["email"],
          provider: params["provider"],
          uuid: params["uuid"]
        }

        create_with_params(conn, user_params)

      true ->
        conn
        |> put_status(:bad_request)
        |> json(%{
          errors:
            "Tentou criar conta com provedor externo mas não foram providas as credenciais."
        })
    end
  end

  def login(conn, params) do
    case Accounts.get_account_by_username(params["username"]) do
      nil ->
        conn
        |> put_status(:unauthorized)
        |> json(%{errors: "Senha ou usuário incorreto."})

      account ->
        case Argon2.verify_pass(params["password"], account.password) do
          true ->
            {:ok, token} = Tokens.create_token_for(account, "access", hours: 24)
            conn
            |> put_status(:ok)
            |> json(%{
              user: %{
                username: account.username,
                email: account.email,
                permissions: account.permission_group,
                token: token.hash
              }
            })

          false ->
            conn
            |> put_status(:unauthorized)
            |> json(%{errors: "Senha ou usuário incorreto."})
        end
    end
  end

  # params here uses atom keys because it comes from user_params built in create/2
  defp create_with_params(conn, params) do
    case Accounts.get_account_by_username(params[:username]) do
      nil ->
        case Accounts.create_account(params) do
          {:ok, account} ->
            {:ok, token} = Tokens.create_token_for(account, "access", hours: 24)

            conn
            |> put_status(:created)
            |> json(%{username: account.username, email: account.email, permissions: account.permissions, token: token.hash})

          {:error, changeset} ->
            errors = Ecto.Changeset.traverse_errors(changeset, fn {msg, _opts} -> msg end)

            conn
            |> put_status(:bad_request)
            |> json(%{errors: errors})
        end

      account ->
        conn
        |> put_status(:unauthorized)
        |> json(%{
          errors: "Usuário já está em uso."
        })
    end
  end
end
