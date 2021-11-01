import { inject, injectable } from 'tsyringe'

import { AppError, AppErrorType } from '../../core/exception/AppError'

import { ITenantsRepository } from './ITenantsRepository'
import { ISignupDTO } from './dto/ISignupDTO'
import { ITenantDTO } from './dto/ITenantDTO'
import { BCryptHashProvider } from '../../infra/providers/BCryptHashProvider'
import { IRolesRepository } from '../users/IRolesRepository'

@injectable()
export class CreateUserAccountService {

  constructor(
    @inject('TenantsRepository')
    private tenantsRepository: ITenantsRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {
  }

  async execute(entity: ISignupDTO) {
    const { email, cpf_cnpj } = entity

    const userCpfCNPJ = await this.tenantsRepository.findByCpfCnpj(cpf_cnpj)
    if (userCpfCNPJ) {
      throw new AppError({
        status: 409,
        type: AppErrorType.CONFLICT_ERROR,
        userMessage: 'Já existe uma conta com este CPF / CNPJ'
      })
    }

    const userEmail = await this.tenantsRepository.findByEmail(email)
    if (userEmail) {
      throw new AppError({
        status: 409,
        type: AppErrorType.CONFLICT_ERROR,
        userMessage: 'Já existe uma conta com este e-mail'
      })
    }

    // Create user
    const hashProvider = new BCryptHashProvider()
    const hashedPassword = await hashProvider.generateHash(entity.password)
    entity.password = hashedPassword

    const role = await this.rolesRepository.findByName(null, 'admin')
    if (!role) {
      throw new AppError({
        status: 404,
        type: AppErrorType.RESOURCE_NOT_FOUND,
        userMessage: 'Nenhuma Role "admin" foi encontrada.'
      })
    }

    const newTenant: ITenantDTO = {
      user: {
        name: entity.name,
        email: entity.email,
        password_hash: entity.password,
      },
      tenant: {
        name: entity.name,
        email: entity.email,
        cpf_cnpj: entity.cpf_cnpj,
        cep: entity.cep,
        address: entity.address,
        complement: entity.complement,
        country: entity.country,
        city: entity.city,
        state: entity.state,
      },
      role: {
        id: role.id,
        name: role.name
      }
    }

    const createdTenant = await this.tenantsRepository.save(newTenant)

    delete createdTenant.user.password_hash

    return createdTenant
  }
}