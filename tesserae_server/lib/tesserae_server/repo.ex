defmodule TesseraeServer.Repo do
  use Ecto.Repo,
    otp_app: :tesserae_server,
    adapter: Ecto.Adapters.Postgres
end
