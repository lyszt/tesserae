defmodule TesseraeServer.Repo.Migrations.CreatePermissionGroups do
  use Ecto.Migration

  def change do
    create table(:permission_groups) do
      add :name, :string, null: false
      add :description, :text
      add :permissions, {:array, :string}, default: []

      timestamps()
    end

    create unique_index(:permission_groups, [:name])

    alter table(:accounts) do
      add :permission_group_id, references(:permission_groups, on_delete: :nilify_all)
    end

    create index(:accounts, [:permission_group_id])
  end
end
