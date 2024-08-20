import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailLoggerService {
  constructor(private mailerService: MailerService) {}

  async sendNotificationEmail(change: any) {
    change.time = new Date(Date.now()).toLocaleString();

    await this.mailerService.sendMail({
      to: process.env.EMAIL_RECEIVER,
      subject: `Project Management Notification Changes`,
      template: './email-changes',
      context: change,
    });
  }
}
