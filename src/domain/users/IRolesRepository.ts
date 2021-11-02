import { IRoleDTO } from "./dto/IRoleDTO"

export interface IRolesRepository {
  listRolesById(role_id: string): Promise<IRoleDTO[]>
  findAll(tenant_id: string): Promise<IRoleDTO[]>
  findByName(tenant_id: string, name: string): Promise<IRoleDTO>
  update(entity: IRoleDTO): Promise<IRoleDTO>
  save(entity: IRoleDTO): Promise<IRoleDTO>
}