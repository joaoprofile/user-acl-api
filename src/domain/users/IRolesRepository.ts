import { IRoleDTO } from "./dto/IRoleDTO"

export interface IRolesRepository {
  findAll(tenant_id: string): Promise<IRoleDTO[]>
  findByName(tenant_id: string, name: string): Promise<IRoleDTO>
  update(entity: IRoleDTO): Promise<IRoleDTO>
  save(entity: IRoleDTO): Promise<IRoleDTO>
}