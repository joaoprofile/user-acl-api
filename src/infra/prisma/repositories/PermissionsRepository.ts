import prismaClient from ".."
import { IPermissionDTO } from "../../../domain/users/dto/IPermissionDTO"
import { IPermissionsRepository } from "../../../domain/users/IPermissionsRepository"

export class PermissionsRepository implements IPermissionsRepository {

  private prisma

  constructor() {
    this.prisma = prismaClient
  }

  public async findById(id: string): Promise<IPermissionDTO> {
    const permission = await this.prisma.prisma.findUnique({
      where: {
        id: id
      },
    })

    return permission
  }

  public async findAll(tenant_id: string): Promise<IPermissionDTO[]> {
    const roles = await this.prisma.role.findMany({
      where: {
        tenant_id: tenant_id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        permissions: {
          select: {
            permission: {
              select: {
                id: true,
                method: true,
                action: true,
                description: true,
              }
            }
          }
        },
      },
    })
    return roles
  }

  public async save(entity: IPermissionDTO): Promise<IPermissionDTO> {
    const { role_id } = entity
    const { permission } = entity

    const createdPermission = await this.prisma.permission.create({
      data: {
        method: permission.method,
        action: permission.action,
        description: permission.description,
        roles: {
          create: [
            {
              role: {
                connect: {
                  id: role_id
                }
              },
            }
          ]
        },
      }
    })

    return createdPermission
  }

}