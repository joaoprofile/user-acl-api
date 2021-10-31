import { Router } from "express"

import { celebrate, Segments, Joi } from 'celebrate'

import { Route } from "../common/Route"
import { CreateUserAccountController } from "./CreateUserAccountController"

class AccountsRoutes extends Route {

  public applyRoutes(route: Router): void {
    route.post(
      '/accounts/sign-up',
      celebrate({
        [Segments.BODY]: {
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().required(),
          cpf_cnpj: Joi.string().required(),
          cep: Joi.string().required(),
          address: Joi.string().required(),
          complement: Joi.string().required(),
          city: Joi.string().required(),
          country: Joi.string().required(),
          state: Joi.string().required(),
        },
      }),
      new CreateUserAccountController().handle
    )
  }

}

export const accountsRoutes = new AccountsRoutes()