import { Request, Response } from "express"

import { container } from "tsyringe"

import * as result from "../common/ResponseType"

export class CreatePermissionController {
  async handle(request: Request, response: Response) {
    const { role_id } = request.body
    const { permissions } = request.body
    const { tenant_id } = request.user

    return result.created(response, { role_id, permissions })
  }
}