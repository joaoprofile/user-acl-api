export interface IPermissionDTO {
  role_id: string
  permissions: {
    resource: string
    method: string
    action: string
    description: string
  }
}