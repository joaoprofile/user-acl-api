import { Response } from 'express'

import { AppError, AppErrorType } from '../../core/exception/AppError'

export function result(
  response: Response, code?: number, type?: string, message?: string) {
  const appError = new AppError({
    status: code ? code : 500,
    type: type ? type : AppErrorType.MESSAGE_NOT_READABLE,
    userMessage: message ? message : AppErrorType.ERROR_MESSAGE_ALL_EXCEPTION,
  })
  return response.status(appError.status).json(appError)
}

export function ok<T>(response: Response, dto?: T): Response {
  if (!!dto) {
    response.type('application/json');
    return response.status(200).json(dto);
  }
  return response.sendStatus(200);
}

export function created<T>(response: Response, dto?: T) {
  if (!!dto) {
    response.type('application/json');
    return response.status(201).json(dto);
  }
  return response.sendStatus(201);
}

export function notContent(response: Response) {
  return response.sendStatus(204);
}

export function clientError(response: Response, message?: string) {
  return result(response, 400, AppErrorType.UNAUTHORIZED, message ? message : '');
}

export function unauthorized(response: Response, message?: string) {
  return result(response, 401, AppErrorType.UNAUTHORIZED, message ? message : '');
}

export function forbidden(response: Response, message?: string) {
  return result(response, 403, AppErrorType.FORBIDDEN, message ? message : '');
}

export function notFound(response: Response, message?: string) {
  return result(response, 404, AppErrorType.RESOURCE_NOT_FOUND, message ? message : '');
}

export function conflict(response: Response, message?: string) {
  return result(response, 409, AppErrorType.CONFLICT_ERROR, message ? message : '');
}

export function fail(response: Response, error?: Error) {
  console.log(error);
  if (error instanceof AppError) {
    return result(response, error.status, error.type, error?.userMessage)
  } else {
    return result(response, 500, AppErrorType.SYSTEM_ERROR, error?.message)
  }
}