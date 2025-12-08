defmodule TesseraeServerTest do
  use ExUnit.Case
  doctest TesseraeServer

  test "greets the world" do
    assert TesseraeServer.hello() == :world
  end
end
