import handlebars from 'handlebars'
import fs from 'fs'

import { IMailTemplateProvider } from "../../core/providers/IMailTemplateProvider"
import { IParseMailTemplateDTO } from "../../core/providers/dto/IParseMailTemplateDTO"

export class HBarsMailTemplateProvider implements IMailTemplateProvider {

  public async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {

    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    })

    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }

}
