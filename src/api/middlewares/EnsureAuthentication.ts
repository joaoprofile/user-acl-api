import { Request, Response, NextFunction } from 'express'

import { verify } from "jsonwebtoken"

import { config } from '../../core/config/environment'
import { AppError, AppErrorType } from '../../core/exception/AppError';
import { IUserRequest } from '../../domain/users/dto/IUserRequestDTO';

interface TokenPayload {
  user: IUserRequest
}

export function EnsureAuthentication(request: Request, response: Response, next: NextFunction) {
  const authHeaders = request.headers.authorization;
  if (!authHeaders) {
    throw new AppError(
      {
        status: 401,
        type: AppErrorType.FORBIDDEN,
        userMessage: 'JWT token está ausente'
      }
    )
  }

  const [, token] = authHeaders.split(" ")
  try {
    const decoded = verify(token, config.JWT.SECRET)
    const { user } = decoded as TokenPayload
    request.user = user

    return next()
  } catch (err) {
    throw new AppError(
      {
        status: 401,
        type: AppErrorType.FORBIDDEN,
        userMessage: 'JWT token inválido'
      }
    )
  }
}