import { Request, Response } from "express"

import * as result from "../common/ResponseType"

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body
    const { tenant_id } = request.user

    const cratedUser = {
      tenant_id, name, email, password,
    }

    return result.created(response, { cratedUser })
  }
}