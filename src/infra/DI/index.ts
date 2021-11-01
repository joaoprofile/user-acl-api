import { container } from 'tsyringe'

import '../providers'

import { ITenantsRepository } from '../../domain/tenants/ITenantsRepository'
import { TenantsRepository } from '../prisma/repositories/TenantsRepository'

import { IUsersRepository } from '../../domain/users/IUsersRepository'
import { UsersRepository } from '../prisma/repositories/UsersRepository'

import { IRolesRepository } from '../../domain/users/IRolesRepository'
import { RolesRepository } from '../prisma/repositories/RolesRepository'

import { IPermissionsRepository } from '../../domain/users/IPermissionsRepository'
import { PermissionsRepository } from '../prisma/repositories/PermissionsRepository'

container.registerSingleton<ITenantsRepository>(
  'TenantsRepository',
  TenantsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository
)

container.registerSingleton<IPermissionsRepository>(
  'PermissionsRepository',
  PermissionsRepository
)


