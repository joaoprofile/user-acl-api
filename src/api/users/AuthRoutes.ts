import { Router } from "express"

import { celebrate, Segments, Joi } from 'celebrate'
import { Route } from "../common/Route"
import { AuthSingInController } from "./AuthSignInController"
import { CreateRoleController } from "./CreateRoleController"
import { EnsureAuthentication } from "../middlewares/EnsureAuthentication"
import { ListRolesController } from "./ListRolesController"
import { CreatePermissionController } from "./CreatePermissionController"

class AuthRoutes extends Route {

  public applyRoutes(route: Router): void {
    route.post(
      '/auth/sign-in',
      celebrate({
        [Segments.BODY]: {
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        },
      }),
      new AuthSingInController().handle
    )

    route.get(
      '/auth/roles',
      EnsureAuthentication,
      new ListRolesController().handle
    )

    route.post(
      '/auth/roles',
      celebrate({
        [Segments.BODY]: {
          name: Joi.string().required(),
          description: Joi.string().required(),
        },
      }),
      EnsureAuthentication,
      new CreateRoleController().handle
    )

    route.post(
      '/auth/permissions',
      celebrate({
        [Segments.BODY]: {
          role_id: Joi.string().required(),
          permissions: Joi.array().items(Joi.object({
            resource: Joi.string().required(),
            method: Joi.string().required(),
            action: Joi.string().required(),
            description: Joi.string().required(),
          }))
        },
      }),
      EnsureAuthentication,
      new CreatePermissionController().handle
    )
  }
}

export const authRoutes = new AuthRoutes()