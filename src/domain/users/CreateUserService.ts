import { inject, injectable } from 'tsyringe'

import { AppError, AppErrorType } from '../../core/exception/AppError'
import { IUserDTO } from './dto/IUserDTO'
import { IUsersRepository } from './IUsersRepository'

@injectable()
export class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {
  }

  async execute(entity: IUserDTO) {
    const { tenant_id, name, email, password_hash, role_id } = entity

    const user = await this.usersRepository.findByEmail(email)
    if (user) {
      throw new AppError({
        status: 409,
        type: AppErrorType.CONFLICT_ERROR,
        userMessage: 'Já existe um usuário com este e-mail'
      })
    }

    const createdRole = await this.usersRepository.save({
      tenant_id,
      name,
      email,
      password_hash,
      role_id
    })

    return createdRole
  }
}