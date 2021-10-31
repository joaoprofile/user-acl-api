export const RolesSeed = [
  {
    // tenant_id: null,
    name: "admin",
    description: "Administradores",
    rolesPermissions: {
      create: [
        {
          permission: {
            create: {
              resource: "all",
              method: "all_access",
              action: "allow",
              description: "Acesso total",
            }
          }
        }
      ]
    }
  }
]