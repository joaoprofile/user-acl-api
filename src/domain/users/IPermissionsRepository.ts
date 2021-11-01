import { IPermissionDTO } from "../users/dto/IPermissionDTO"

export interface IPermissionsRepository {
  findAll(tenant_id: string): Promise<IPermissionDTO[]>
  findById(id: string): Promise<IPermissionDTO>
  save(entity: IPermissionDTO): Promise<IPermissionDTO>
}