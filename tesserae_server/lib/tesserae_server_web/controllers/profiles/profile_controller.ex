defmodule TesseraeServerWeb.Profile.ProfileController do
  use TesseraeServerWeb, :controller
  alias TesseraeServer.Profiles

  def get_profile_by_id(conn, params) do
    cond do
      is_nil(params["userId"]) ->
        conn
        |> put_status(:bad_request)
        |> json(%{errors: "Can't get profile with empty id."})

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
            conn
            |> put_status(:ok)
            |> json(%{profile: profile})
        end
    end
  end
end
