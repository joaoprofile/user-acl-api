export interface Role {
  role_id: string
}

export interface IUserRequest {
  id: string
  tenant_id: string
  name: string
  email: string
  roles: Role[]
}