defmodule TesseraeServer.Repo.Migrations.AddCompanyToPosts do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      add :company_id, references(:companies, on_delete: :nilify_all)
    end

    create index(:posts, [:company_id])
  end
end
