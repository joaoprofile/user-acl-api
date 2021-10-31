import { IParseMailTemplateDTO } from "./dto/IParseMailTemplateDTO"

export interface IMailTemplateProvider {

  parse(data: IParseMailTemplateDTO): Promise<string>

}
