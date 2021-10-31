import { App } from './src/app'
import { config } from "./src/core/config/environment"
import { accountsRoutes } from './src/api/tenants/AccountsRoutes'
import { authRoutes } from './src/api/users/AuthRoutes'
import { usersRoutes } from './src/api/users/UsersRoutes'

const appServer = new App().routes([
  accountsRoutes,
  authRoutes,
  usersRoutes,
])

appServer.listen(config.SERVER.PORT, () => {
  console.log(`Server listening on port ${config.SERVER.BASE_URL}`)
})