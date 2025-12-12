defmodule TesseraeServer.Repo.Migrations.AddReportCountToContent do
  use Ecto.Migration

  def change do
    alter table(:posts) do
      add :report_count, :integer, default: 0, null: false
    end

    alter table(:feed_posts) do
      add :report_count, :integer, default: 0, null: false
    end

    alter table(:comments) do
      add :report_count, :integer, default: 0, null: false
    end

    create index(:posts, [:report_count])
    create index(:feed_posts, [:report_count])
    create index(:comments, [:report_count])
  end
end
