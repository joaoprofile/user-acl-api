interface CreateError {
  status?: number,
  type?: string,
  userMessage?: string,
  detail?: string,
}

export const AppErrorType = {
  FORBIDDEN: 'Violação de regras de Segurança',
  UNAUTHORIZED: 'Não autorizado',
  CONFLICT_ERROR: 'Duplicidade de informação',
  RESOURCE_NOT_FOUND: 'Recurso não encontrado',
  SYSTEM_ERROR: 'Erro de sistema',
  INVALID_PARAMETER: 'Parâmetro inválido',
  MESSAGE_NOT_READABLE: 'Erro Interno, não catalogado',
  ENTITY_IN_USE: 'Entidade em uso',
  BUSINESS_ERROR: 'Violação de regra de negócio',
  ERROR_MESSAGE_ALL_EXCEPTION:
    'Ocorreu um erro interno inesperado no sistema. Tente novamente e se o problema persistir, entre em contato com o administrador do sistema.'
}

export class AppError {
  readonly status: number
  readonly type: string
  readonly userMessage: string
  readonly timestamp: Date
  readonly detail: string

  constructor({
    status = 500,
    type = AppErrorType.MESSAGE_NOT_READABLE,
    userMessage = AppErrorType.ERROR_MESSAGE_ALL_EXCEPTION,
    detail = AppErrorType.SYSTEM_ERROR }: CreateError) {

    this.status = status
    this.type = type
    this.userMessage = userMessage
    this.detail = detail
    this.timestamp = new Date()
  }

}