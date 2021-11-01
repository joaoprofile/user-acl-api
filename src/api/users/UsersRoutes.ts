import { Router } from "express"

import { celebrate, Segments, Joi } from 'celebrate'
import { Route } from "../common/Route"
import { EnsureAuthentication } from "../middlewares/EnsureAuthentication"
import { CreateUserController } from "./CreateUserController"

class UsersRoutes extends Route {

  public applyRoutes(route: Router): void {
    route.post(
      '/users',
      celebrate({
        [Segments.BODY]: {
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().required(),
          role_id: Joi.string().required(),
        },
      }),

      EnsureAuthentication,
      new CreateUserController().handle
    )
  }

}

export const usersRoutes = new UsersRoutes()