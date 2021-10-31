import nodemailer, { Transporter } from 'nodemailer'
import aws from 'aws-sdk'

import { config } from '../../core/config/environment'
import { emailConfig } from '../../core/config/mail'
import { IMailProvider } from "../../core/providers/IMailProvider"
import { ISendMailDTO } from '../../core/providers/dto/ISendMailDTO'
import { IMailTemplateProvider } from '../../core/providers/IMailTemplateProvider'

export class SESMailProvider implements IMailProvider {

  private client: Transporter

  constructor(
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: config.AWS.REGION
      })
    })
  }

  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    const { name, email } = emailConfig.defaults.from

    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })
  }

}
