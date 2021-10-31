import { config } from "./environment"

interface IMailConfig {
  driver: 'dev' | 'ses'

  defaults: {
    from: {
      name: string
      email: string
    }
  }
}

export const emailConfig = {
  driver: config.SERVICES.MAIL_DRIVER || 'dev',

  defaults: {
    from: {
      name: config.SERVICES.MAIL_NAME,
      email: config.SERVICES.MAIL_ADDRESS
    }
  }
} as IMailConfig
