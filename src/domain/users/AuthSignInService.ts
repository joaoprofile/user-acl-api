import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { config } from '../../core/config/environment'
import { AppError, AppErrorType } from '../../core/exception/AppError'
import { IHashProvider } from '../../core/providers/IHashProvider'
import { IAccessTokenResponseDTO } from '../users/dto/IAccessTokenResponseDTO'
import { IUsersRepository } from './IUsersRepository'

interface IUserSignIn {
  email: string
  password: string
}

@injectable()
export class AuthSignInService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {
  }

  async execute({ email, password }: IUserSignIn): Promise<IAccessTokenResponseDTO> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError({
        status: 401,
        type: AppErrorType.FORBIDDEN,
        userMessage: 'Login e/ou Senha não conferem'
      })
    }
    if (!user.is_active) {
      throw new AppError({
        status: 401,
        type: AppErrorType.FORBIDDEN,
        userMessage: 'Conta Desativada pelo administrador!'
      }
      )
    }

    if (!user.is_AccountConfirmed) {
      throw new AppError({
        status: 401,
        type: AppErrorType.FORBIDDEN,
        userMessage: 'Conta não confirmada, verifique seu e-mail e confirme sua conta'
      }
      )
    }

    // Verify password
    const matchedPassword = await this.hashProvider.compareHash(password, user.password_hash)
    if (!matchedPassword) {
      throw new AppError({
        status: 401,
        type: AppErrorType.FORBIDDEN,
        userMessage: 'Login e/ou Senha não conferem'
      })
    }

    // Generate token JWT
    const { SECRET, EXPIRES_IN } = config.JWT
    const token = sign({
      user: {
        id: user.id,
        tenant_id: user.tenant_id,
        name: user.name,
        email: user.email,
        roles: user.roles
      }
    },
      SECRET,
      { expiresIn: EXPIRES_IN })

    delete user.password_hash

    return { token }
  }
}