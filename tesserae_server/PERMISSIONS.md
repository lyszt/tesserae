# Permission Groups System

This document describes the permission group system implemented in Tesserae Server.

## Overview

The permission group system provides role-based access control (RBAC) for the application. Each account can be assigned to a permission group, which determines what actions they can perform in the system.

## Database Schema

### Permission Groups Table

```sql
CREATE TABLE permission_groups (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  permissions TEXT[] DEFAULT '{}',
  inserted_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
```

### Accounts Table Relationship

The `accounts` table includes a foreign key reference to `permission_groups`:

```sql
ALTER TABLE accounts
  ADD COLUMN permission_group_id BIGINT REFERENCES permission_groups(id) ON DELETE SET NULL;
```

When a permission group is deleted, the `permission_group_id` for associated accounts is set to `NULL`.

## Schemas

### PermissionGroup Schema

Located in `lib/tesserae_server/permission_group.ex`

**Fields:**
- `name` (string, required, unique) - The name of the permission group
- `description` (string, optional) - A description of what this group can do
- `permissions` (array of strings) - List of permission strings this group has
- `accounts` (has_many) - All accounts belonging to this group

### Account Schema

Located in `lib/tesserae_server/account.ex`

**Relationship:**
- `belongs_to :permission_group, PermissionGroup` - The account's assigned permission group

## Default Permission Groups

The system comes with three default permission groups (see `priv/repo/seeds.exs`):

### 1. Admin
Full system access with all permissions:
- `accounts.create`
- `accounts.read`
- `accounts.update`
- `accounts.delete`
- `posts.create`
- `posts.read`
- `posts.update`
- `posts.delete`
- `permission_groups.manage`

### 2. User
Standard user with basic permissions:
- `accounts.read`
- `accounts.update_own`
- `posts.create`
- `posts.read`
- `posts.update_own`
- `posts.delete_own`

### 3. Guest
Limited read-only access:
- `posts.read`

## Permission Naming Convention

Permissions follow the format: `resource.action` or `resource.action_scope`

Examples:
- `posts.read` - Can read all posts
- `posts.create` - Can create posts
- `posts.update_own` - Can only update own posts
- `accounts.delete` - Can delete accounts
- `permission_groups.manage` - Can manage permission groups

## Usage

### Creating a Permission Group

```elixir
alias TesseraeServer.Accounts

{:ok, group} = Accounts.create_permission_group(%{
  name: "Moderator",
  description: "Can moderate content",
  permissions: ["posts.read", "posts.update", "posts.delete"]
})
```

### Assigning a Permission Group to an Account

```elixir
# By permission group struct
{:ok, account} = Accounts.assign_permission_group(account, permission_group)

# By permission group name
{:ok, account} = Accounts.assign_permission_group_by_name(account, "Admin")
```

### Checking Permissions

```elixir
# Check if an account has a specific permission
if Accounts.has_permission?(account, "posts.create") do
  # Allow action
else
  # Deny action
end
```

### Listing Permission Groups

```elixir
groups = Accounts.list_permission_groups()
```

### Getting an Account with Permission Group

```elixir
# Account is automatically preloaded with permission_group
account = Accounts.get_account!(123)
account.permission_group.name # => "Admin"
account.permission_group.permissions # => ["accounts.create", ...]
```

## Context Module

All permission group and account operations are handled through the `TesseraeServer.Accounts` context module located in `lib/tesserae_server/accounts.ex`.

### Available Functions

**Account Operations:**
- `list_accounts/0` - List all accounts
- `get_account!/1` - Get account by ID
- `get_account_by_username/1` - Get account by username
- `get_account_by_email/1` - Get account by email
- `create_account/1` - Create a new account
- `update_account/2` - Update an account
- `delete_account/1` - Delete an account
- `change_account/2` - Get changeset for account

**Permission Group Operations:**
- `list_permission_groups/0` - List all permission groups
- `get_permission_group!/1` - Get permission group by ID
- `get_permission_group_by_name/1` - Get permission group by name
- `create_permission_group/1` - Create a new permission group
- `update_permission_group/2` - Update a permission group
- `delete_permission_group/1` - Delete a permission group
- `change_permission_group/2` - Get changeset for permission group

**Permission Operations:**
- `has_permission?/2` - Check if account has a specific permission
- `assign_permission_group/2` - Assign permission group to account
- `assign_permission_group_by_name/2` - Assign permission group by name

## Running Migrations

To set up the permission groups table:

```bash
cd tesserae_server
mix ecto.migrate
```

To seed default permission groups:

```bash
mix run priv/repo/seeds.exs
```

## Adding New Permissions

To add new permissions to the system:

1. Define the permission string following the naming convention
2. Add it to the appropriate permission group(s)
3. Use `Accounts.has_permission?/2` in your controllers or contexts to check access

Example:

```elixir
# In a controller
def delete(conn, %{"id" => id}) do
  current_account = conn.assigns.current_account
  
  if Accounts.has_permission?(current_account, "posts.delete") do
    # Proceed with deletion
  else
    conn
    |> put_status(:forbidden)
    |> json(%{error: "Insufficient permissions"})
  end
end
```

## Best Practices

1. **Always preload permission_group** when checking permissions to avoid N+1 queries
2. **Use meaningful permission names** that clearly indicate what they control
3. **Document new permissions** when adding them to the system
4. **Consider scope** - use `_own` suffix when permissions only apply to user's own resources
5. **Default to least privilege** - new accounts should start with minimal permissions
6. **Test permissions** - write tests to ensure permission checks work correctly

## Security Considerations

- Never trust client-side permission checks alone
- Always verify permissions on the server side before performing sensitive operations
- Log permission-related events for audit purposes
- Regularly review and update permission assignments
- Consider implementing permission caching for high-traffic applications

## Future Enhancements

Potential improvements to consider:

- Permission hierarchies (inheriting permissions)
- Dynamic permission checking based on resource ownership
- Time-based permissions (temporary access)
- Permission audit logs
- Role inheritance
- Custom permission validators
- Permission groups for API keys/tokens