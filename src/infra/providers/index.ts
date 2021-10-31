import { container } from 'tsyringe'

import { IHashProvider } from '../../core/providers/IHashProvider'
import { BCryptHashProvider } from './BCryptHashProvider'

const providers = {
  bcrypt: BCryptHashProvider,
}

container.registerSingleton<IHashProvider>(
  'HashProvider',
  providers.bcrypt
)
