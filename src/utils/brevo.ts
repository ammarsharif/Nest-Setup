import * as brevo from '@getbrevo/brevo';
import { HttpStatus } from '@nestjs/common';

export enum BrevoTemplates {
  AccountVerification = 1,
  AccountVerificationTemplate = 2,
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
        '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',
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
