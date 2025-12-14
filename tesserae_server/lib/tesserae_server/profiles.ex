defmodule TesseraeServer.Profiles do

  import Ecto.Query, warn: false
  alias TesseraeServer.Repo
  alias TesseraeServer.Accounts.Profile
  alias TesseraeServer.Accounts.Account

  def list_profiles do
    Repo.all(Profile)
    |> Repo.preload([:account, :academic_articles, :co_authored_articles, :job_experiences, :awards, :skills, :projects])
  end

  def get_profile!(id) do
    Repo.get!(Profile, id)
    |> Repo.preload([:account, :academic_articles, :co_authored_articles, :job_experiences, :awards, :skills, :projects])
  end

  def get_profile_by_account_id(account_id) do
    Repo.get_by(Profile, account_id: account_id)
    |> case do
      nil -> nil
      profile -> Repo.preload(profile, [:account, :academic_articles, :co_authored_articles, :job_experiences, :awards, :skills, :projects])
    end
  end

  def get_profile_by_username(username) when is_binary(username) do
    query = from(p in Profile,
      join: a in Account, on: a.id == p.account_id,
      where: a.username == ^username,
      preload: [:academic_articles, :co_authored_articles, :job_experiences, :awards, :skills, :projects, account: a]
    )

    Repo.one(query)
  end

  def create_profile(attrs \\ %{}) do
    %Profile{}
    |> Profile.changeset(attrs)
    |> Repo.insert()
  end

  def update_profile(%Profile{} = profile, attrs) do
    profile
    |> Profile.changeset(attrs)
    |> Repo.update()
  end

  def delete_profile(%Profile{} = profile) do
    Repo.delete(profile)
  end

  def change_profile(%Profile{} = profile, attrs \\ %{}) do
    Profile.changeset(profile, attrs)
  end
end
