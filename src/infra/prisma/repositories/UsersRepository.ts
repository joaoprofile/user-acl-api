import prismaClient from ".."
import { IUserDTO } from "../../../domain/users/dto/IUserDTO"
import { IUsersRepository } from "../../../domain/users/IUsersRepository"

export class UsersRepository implements IUsersRepository {

  private prisma

  constructor() {
    this.prisma = prismaClient
  }

  public async findById(id: string): Promise<IUserDTO> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      },
    })
    return user
  }

  public async findByEmail(email: string): Promise<IUserDTO> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email
      },
      select: {
        id: true,
        tenant_id: true,
        name: true,
        email: true,
        password_hash: true,
        is_active: true,
        is_AccountConfirmed: true,
      }
    })

    return user
  }

  public async save(entity: IUserDTO): Promise<IUserDTO> {
    const {
      tenant_id,
      name,
      email,
      password_hash,
      role_id
    } = entity

    const userCreated = await this.prisma.user.create({
      data: {
        name,
        email,
        password_hash,
        is_active: true,
        tenant: {
          connect: {
            id: tenant_id,
          }
        },
        roles: {
          create: [
            {
              role: { connect: { id: role_id } }
            }
          ]
        },
      }
    })

    return entity
  }

}