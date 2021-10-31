import { Request, Response } from "express"

import { container } from "tsyringe"

import * as result from "../common/ResponseType"
import { CreateRoleService } from "../../domain/users/CreateRoleService"
import { IRoleDTO } from "../../domain/dto/IRoleDTO"

export class CreateRoleController {
  async handle(request: Request, response: Response) {
    const { name, description } = request.body
    const { tenant_id } = request.user

    const roleService = container.resolve(CreateRoleService)
    const createdRole = await roleService.execute({
      tenant_id,
      name,
      description
    })

    return result.created<IRoleDTO>(response, createdRole)
  }
}