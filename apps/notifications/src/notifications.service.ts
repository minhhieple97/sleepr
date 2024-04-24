import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dtos';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('EMAIL_HOST'),
      port: this.configService.get('EMAIL_PORT'),
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendEmail(to: string, text: string) {
    const mailOptions = {
      from: this.configService.get('EMAIL_FROM'),
      to,
      subject: 'Sleeper Notification',
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
  async notifyEmail(data: NotifyEmailDto) {
    await this.sendEmail(data.email, data.text);
  }
}
