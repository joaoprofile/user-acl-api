import { ISendMailDTO } from "./dto/ISendMailDTO"

export interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>
}
