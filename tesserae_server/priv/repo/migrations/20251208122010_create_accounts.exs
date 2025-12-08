defmodule TesseraeServer.Repo.Migrations.CreateAccounts do
  use Ecto.Migration

  def change do
    create table(:accounts) do
      add :username, :string
      add :password,:string
      add :email, :string
      add :provider, :string
      add :uuid, :string
      timestamps()
    end

  end
end
