import * as brevo from '@getbrevo/brevo';
import { HttpStatus } from '@nestjs/common';

export enum BrevoTemplates {
  AccountVerification = 1,
  AccountVerificationTemplate = 2,
  ForgotPassword = 3,
}

export class BrevoUtils {
  static async send(
    template: BrevoTemplates,
    data: any,
    to: string,
    toName?: string,
    attachment?: brevo.SendSmtpEmailAttachmentInner[],
  ): Promise<boolean> {
    try {
      const api = new brevo.TransactionalEmailsApi();
      api.setApiKey(
        brevo.TransactionalEmailsApiApiKeys.apiKey,
        process.env.BREVO_API_KEY ?? '',
      );
      const res = await api.sendTransacEmail({
        to: [
          {
            email: to.trim(),
            name: toName,
          },
        ],
        templateId: template,
        params: data,
        attachment,
      });
      return (
        res.response.statusCode == HttpStatus.CREATED ||
        res.response.statusCode == HttpStatus.OK
      );
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
