import prismaClient from ".."
import { IRoleDTO } from "../../../domain/dto/IRoleDTO"
import { IRolesRepository } from "../../../domain/users/IRolesRepository"

export class RolesRepository implements IRolesRepository {

  private prisma

  constructor() {
    this.prisma = prismaClient
  }

  public async findAll(tenant_id: string): Promise<IRoleDTO[]> {
    const roles = await this.prisma.role.findMany({
      where: {
        tenant_id: tenant_id,
      },
    })
    return roles
  }

  public async findByName(tenant_id: string, name: string): Promise<IRoleDTO> {
    const role = await this.prisma.role.findFirst({
      where: {
        tenant_id: tenant_id,
        name: name
      },
    })
    return role
  }

  public async update(entity: IRoleDTO): Promise<IRoleDTO> {
    return
  }
  public async save(entity: IRoleDTO): Promise<IRoleDTO> {
    const createdRole = await this.prisma.role.create({
      data: entity
    })

    return createdRole
  }

}