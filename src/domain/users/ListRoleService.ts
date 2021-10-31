import { inject, injectable } from 'tsyringe'

import { IRolesRepository } from './IRolesRepository'

@injectable()
export class ListRoleService {

  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {
  }

  async execute(tenant_id: string) {
    const roles = await this.rolesRepository.findAll(tenant_id)

    return roles
  }
}