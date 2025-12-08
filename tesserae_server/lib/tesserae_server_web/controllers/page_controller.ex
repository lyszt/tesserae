defmodule TesseraeServerWeb.PageController do
  use TesseraeServerWeb, :controller

  def home(conn, _params) do
    conn
    |> put_layout(false)
    |> render(:home)
  end
end
