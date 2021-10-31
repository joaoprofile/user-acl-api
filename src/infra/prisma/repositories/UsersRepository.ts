import prismaClient from ".."
import { IUserDTO } from "../../../domain/dto/IUserDTO"
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
    })
    return user
  }

  public async save(entity: IUserDTO): Promise<IUserDTO> {
    // const { user, tenant } = entity

    // const tenantCreated = await this.prisma.user.create({
    //   data: {
    //     name: user.name,
    //     email: user.email,
    //     password_hash: user.password_hash,
    //     is_active: true,
    //     usersRoles: {
    //       create: [
    //         {
    //           role: { connect: { name: 'root', } }
    //         }
    //       ]
    //     },
    //     tenant: {
    //       create: {
    //         name: tenant.name,
    //         email: tenant.email,
    //         cpf_cnpj: tenant.cpf_cnpj,
    //         cep: tenant.cep,
    //         address: tenant.address,
    //         complement: tenant.complement,
    //         country: tenant.country,
    //         city: tenant.city,
    //         state: tenant.state,
    //       }
    //     }
    //   }
    // })

    return entity
  }

}