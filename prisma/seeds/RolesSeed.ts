export const RolesSeed = [
  {
    name: "admin",
    description: "Administradores",
    permissions: {
      create: [
        {
          permission: {
            create: {
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