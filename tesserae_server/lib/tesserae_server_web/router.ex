defmodule TesseraeServerWeb.Router do
  use TesseraeServerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {TesseraeServerWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", TesseraeServerWeb do
    pipe_through :browser

    get "/", Pages.PageController, :home
  end

  # Other scopes may use custom stacks.
  scope "/api", TesseraeServerWeb do
     pipe_through :api

     get("/profile", Profile.ProfileController, :get_profile_by_id)

     scope "/auth" do
       post("/register", Accounts.AccountController, :create)
       post("/login", Accounts.AccountController, :login)
       post("/validate", Tokens.TokenController, :validate)
       get("/check-username", Accounts.AccountController, :check_username_match)
     end
  end

  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:tesserae_server, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/dev" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: TesseraeServerWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end

  end
end
