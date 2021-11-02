import { NextFunction, Request, Response } from "express"

import { container } from "tsyringe"

import { AppError, AppErrorType } from "../../core/exception/AppError";
import { RolesRepository } from "../../infra/prisma/repositories/RolesRepository"

export function is(rolesRoutes: String[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const user = request.user

    if (!user) {
      return response.status(400).json("Usuário não existe");
    }

    const { role_id } = user.roles[0]
    const rolesRepository = container.resolve(RolesRepository)
    const userRoles = await rolesRepository.listRolesById(role_id)

    if (!userRoles) {
      return response.status(400).json("Role não existe");
    }

    const roleExists = userRoles
      .map((role) => role.name)
      .some((role) => rolesRoutes.includes(role))

    if (!roleExists) {
      throw new AppError(
        {
          status: 401,
          type: AppErrorType.FORBIDDEN,
          userMessage: 'Acesso não autorizado!'
        }
      )
    }

    return next();
  };
}