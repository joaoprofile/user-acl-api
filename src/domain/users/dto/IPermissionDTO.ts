export interface IPermissionDTO {
  role_id: string,
  permission: {
    method: string
    action: string
    description: string
  }
}