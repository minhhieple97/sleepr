import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dtos';

@Injectable()
export class NotificationsService {
  notifyEmail(data: NotifyEmailDto) {
    console.log(data);
  }
}
