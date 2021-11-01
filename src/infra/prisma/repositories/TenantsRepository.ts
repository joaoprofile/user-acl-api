import prismaClient from ".."

import { ITenantDTO } from "../../../domain/tenants/dto/ITenantDTO"
import { ITenantsRepository } from "../../../domain/tenants/ITenantsRepository"

export class TenantsRepository implements ITenantsRepository {

  private prisma

  constructor() {
    this.prisma = prismaClient
  }

  public async findById(id: string): Promise<ITenantDTO> {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        id: id
      },
    })
    return tenant
  }

  public async findByEmail(email: string): Promise<ITenantDTO> {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        email: email
      },
    })
    return tenant
  }

  public async findByCpfCnpj(cpfCpj: string): Promise<ITenantDTO> {
    const tenant = await this.prisma.tenant.findUnique({
      where: {
        cpf_cnpj: cpfCpj
      },
    })
    return tenant
  }

  public async save(entity: ITenantDTO): Promise<ITenantDTO> {
    const { user, tenant, role } = entity

    const tenantCreated = await this.prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password_hash: user.password_hash,
        is_active: true,
        is_AccountConfirmed: true, // TODO, implements
        roles: {
          create: [
            {
              role: {
                connect: {
                  id: role.id,
                }
              },
            }
          ]
        },
        tenant: {
          create: {
            name: tenant.name,
            email: tenant.email,
            cpf_cnpj: tenant.cpf_cnpj,
            cep: tenant.cep,
            address: tenant.address,
            complement: tenant.complement,
            country: tenant.country,
            city: tenant.city,
            state: tenant.state,
          }
        }
      }
    })

    return { user, role, tenant }
  }

}