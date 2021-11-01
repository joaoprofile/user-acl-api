import { inject, injectable } from 'tsyringe'
import { IPermissionDTO } from '../users/dto/IPermissionDTO'

import { IPermissionsRepository } from './IPermissionsRepository'

@injectable()
export class CreatePermissionService {

  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {
  }

  async execute(entity: IPermissionDTO) {
    const createdPermission = await this.permissionsRepository.save(entity)

    return createdPermission
  }

}