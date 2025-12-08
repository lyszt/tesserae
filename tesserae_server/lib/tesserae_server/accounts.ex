defmodule TesseraeServer.Accounts do
  import Ecto.Query, warn: false
  alias TesseraeServer.Repo
  alias TesseraeServer.Account
  alias TesseraeServer.PermissionGroup

  def list_accounts do
    Repo.all(Account)
    |> Repo.preload(:permission_group)
  end

  def get_account!(id) do
    Repo.get!(Account, id)
    |> Repo.preload(:permission_group)
  end

  def get_account_by_username(username) do
    Repo.get_by(Account, username: username)
    |> Repo.preload(:permission_group)
  end

  def get_account_by_email(email) do
    Repo.get_by(Account, email: email)
    |> Repo.preload(:permission_group)
  end

  def create_account(attrs \\ %{}) do
    %Account{}
    |> Account.changeset(attrs)
    |> Repo.insert()
  end

  def update_account(%Account{} = account, attrs) do
    account
    |> Account.changeset(attrs)
    |> Repo.update()
  end

  def delete_account(%Account{} = account) do
    Repo.delete(account)
  end

  def change_account(%Account{} = account, attrs \\ %{}) do
    Account.changeset(account, attrs)
  end

  def has_permission?(%Account{} = account, permission) do
    account = Repo.preload(account, :permission_group)

    case account.permission_group do
      nil -> false
      group -> permission in group.permissions
    end
  end

  def list_permission_groups do
    Repo.all(PermissionGroup)
  end

  def get_permission_group!(id), do: Repo.get!(PermissionGroup, id)

  def get_permission_group_by_name(name) do
    Repo.get_by(PermissionGroup, name: name)
  end

  def create_permission_group(attrs \\ %{}) do
    %PermissionGroup{}
    |> PermissionGroup.changeset(attrs)
    |> Repo.insert()
  end

  def update_permission_group(%PermissionGroup{} = permission_group, attrs) do
    permission_group
    |> PermissionGroup.changeset(attrs)
    |> Repo.update()
  end

  def delete_permission_group(%PermissionGroup{} = permission_group) do
    Repo.delete(permission_group)
  end

  def change_permission_group(%PermissionGroup{} = permission_group, attrs \\ %{}) do
    PermissionGroup.changeset(permission_group, attrs)
  end

  def assign_permission_group(%Account{} = account, %PermissionGroup{} = permission_group) do
    update_account(account, %{permission_group_id: permission_group.id})
  end

  def assign_permission_group_by_name(%Account{} = account, group_name) do
    case get_permission_group_by_name(group_name) do
      nil -> {:error, :permission_group_not_found}
      group -> assign_permission_group(account, group)
    end
  end
end
