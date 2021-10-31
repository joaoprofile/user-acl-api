import { Request, Response } from "express"

import { container } from "tsyringe"

import { IRoleDTO } from "../../domain/dto/IRoleDTO"
import { ListRoleService } from "../../domain/users/ListRoleService"
import * as result from "../common/ResponseType"

export class ListRolesController {

  async handle(request: Request, response: Response) {
    const { tenant_id } = request.user

    const roleService = container.resolve(ListRoleService)
    const listRoles = await roleService.execute(tenant_id)

    return result.ok<IRoleDTO[]>(response, listRoles)
  }
}