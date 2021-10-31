import { Request, Response } from "express"

import { container } from "tsyringe"

import * as result from "../common/ResponseType"
import { CreateUserAccountService } from "../../domain/tenants/CreateUserAccountService"

export class CreateUserAccountController {
  async handle(request: Request, response: Response) {
    const {
      name,
      email,
      password,
      cpf_cnpj,
      cep,
      address,
      complement,
      city,
      country,
      state,
    } = request.body

    const createService = container.resolve(CreateUserAccountService)
    const createUser = await createService.execute({
      name,
      email,
      password,
      cpf_cnpj,
      cep,
      address,
      complement,
      city,
      country,
      state
    })

    return result.created(response, createUser)
  }
}