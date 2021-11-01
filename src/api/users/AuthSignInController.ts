import { Request, Response } from "express"

import { container } from "tsyringe"
import { IAccessTokenResponseDTO } from "../../domain/users/dto/IAccessTokenResponseDTO"

import { AuthSignInService } from "../../domain/users/AuthSignInService"
import * as result from "../common/ResponseType"

export class AuthSingInController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const authSignIn = container.resolve(AuthSignInService)
    const userLogged = await authSignIn.execute({ email, password, })

    return result.ok<IAccessTokenResponseDTO>(response, userLogged)
  }
}