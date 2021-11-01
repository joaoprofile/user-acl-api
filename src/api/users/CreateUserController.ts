import { Request, Response } from "express"

import { container } from "tsyringe"

import { CreateUserService } from "../../domain/users/CreateUserService"
import { IUserDTO } from "../../domain/users/dto/IUserDTO"
import * as result from "../common/ResponseType"

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password, role_id } = request.body
    const { tenant_id } = request.user

    const userService = container.resolve(CreateUserService)
    const createdUser = await userService.execute({
      tenant_id,
      name,
      email,
      password_hash: password,
      role_id
    })

    return result.created<IUserDTO>(response, createdUser)
  }
}