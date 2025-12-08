# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TesseraeServer.Repo.insert!(%TesseraeServer.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias TesseraeServer.Repo
alias TesseraeServer.PermissionGroup

# Create default permission groups
admin_group = Repo.insert!(%PermissionGroup{
  name: "Admin",
  description: "Full system access with all permissions",
  permissions: [
    "accounts.create",
    "accounts.read",
    "accounts.update",
    "accounts.delete",
    "posts.create",
    "posts.read",
    "posts.update",
    "posts.delete",
    "permission_groups.manage"
  ]
})

user_group = Repo.insert!(%PermissionGroup{
  name: "User",
  description: "Standard user with basic permissions",
  permissions: [
    "accounts.read",
    "accounts.update_own",
    "posts.create",
    "posts.read",
    "posts.update_own",
    "posts.delete_own"
  ]
})

guest_group = Repo.insert!(%PermissionGroup{
  name: "Guest",
  description: "Limited read-only access",
  permissions: [
    "posts.read"
  ]
})

IO.puts("✓ Created #{admin_group.name} permission group")
IO.puts("✓ Created #{user_group.name} permission group")
IO.puts("✓ Created #{guest_group.name} permission group")
