export const config = {
  SERVER: {
    PORT: process.env.SERVER_PORT || 4000,
    BASE_URL: process.env.SERVER_BASE_URL || 'http://localhost:4000'
  },
  SERVICES: {
    CEP_API: 'https://viacep.com.br/ws/',
    MAIL_DRIVER: process.env.MAIL_DRIVER,
    MAIL_NAME: process.env.MAIL_NAME,
    MAIL_ADDRESS: process.env.MAIL_ADDRESS,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES || "1d"
  },
  AWS: {
    REGION: process.env.AWS_REGION,
  }
}