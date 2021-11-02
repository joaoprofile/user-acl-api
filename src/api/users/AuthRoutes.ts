import { Router } from "express"

import { celebrate, Segments, Joi } from 'celebrate'
import { Route } from "../common/Route"
import { AuthSingInController } from "./AuthSignInController"
import { CreateRoleController } from "./CreateRoleController"
import { EnsureAuthentication } from "../middlewares/EnsureAuthentication"
import { ListRolesController } from "./ListRolesController"
import { CreatePermissionController } from "./CreatePermissionController"
import { is } from "../middlewares/PermissionRole"

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
      is(["admin"]),
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
      is(["admin"]),
      new CreateRoleController().handle
    )

    // Array Valid 
    // celebrate({
    //   [Segments.BODY]: {
    //     role_id: Joi.string().required(),
    //     permissions: Joi.array().items(Joi.object({
    //       method: Joi.string().required(),
    //       action: Joi.string().required(),
    //       description: Joi.string().required(),
    //     }))
    //   },
    // }),

    route.post(
      '/auth/permissions',
      celebrate({
        [Segments.BODY]: {
          role_id: Joi.string().required(),
          permission: Joi.object({
            method: Joi.string().required(),
            action: Joi.string().required(),
            description: Joi.string().required(),
          })
        },
      }),
      EnsureAuthentication,
      is(["admin"]),
      new CreatePermissionController().handle
    )
  }
}

export const authRoutes = new AuthRoutes()