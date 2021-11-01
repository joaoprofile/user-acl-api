import { Request, Response } from "express"

import { container } from "tsyringe"
import { IPermissionDTO } from "../../domain/users/dto/IPermissionDTO"
import { CreatePermissionService } from "../../domain/users/CreatePermissionService"

import * as result from "../common/ResponseType"

export class CreatePermissionController {
  async handle(request: Request, response: Response) {
    const { permission } = request.body
    const { role_id } = request.body

    const permissionService = container.resolve(CreatePermissionService)
    const createdPermission = await permissionService.execute({
      role_id,
      permission
    })

    return result.created<IPermissionDTO>(response, createdPermission)
  }
}