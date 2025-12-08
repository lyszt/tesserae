defmodule TesseraeServer.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      TesseraeServerWeb.Telemetry,
      TesseraeServer.Repo,
      {DNSCluster, query: Application.get_env(:tesserae_server, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: TesseraeServer.PubSub},
      # Start a worker by calling: TesseraeServer.Worker.start_link(arg)
      # {TesseraeServer.Worker, arg},
      # Start to serve requests, typically the last entry
      TesseraeServerWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: TesseraeServer.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    TesseraeServerWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
