import { inject, injectable } from 'tsyringe'

import { AppError, AppErrorType } from '../../core/exception/AppError'
import { IRoleDTO } from './dto/IRoleDTO'
import { IRolesRepository } from './IRolesRepository'

@injectable()
export class CreateRoleService {

  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {
  }

  async execute(entity: IRoleDTO) {
    const { tenant_id, name, description } = entity
    console.log(entity)
    const role = await this.rolesRepository.findByName(tenant_id, name)

    if (role) {
      throw new AppError({
        status: 409,
        type: AppErrorType.CONFLICT_ERROR,
        userMessage: 'Já existe uma Role com este nome'
      })
    }

    const newRole: IRoleDTO = {
      tenant_id,
      name,
      description,
    }

    const createdRole = await this.rolesRepository.save(newRole)

    return createdRole
  }
}