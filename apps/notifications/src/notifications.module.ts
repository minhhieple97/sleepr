import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule } from '@nestjs/config';
import environment from './config/environment';
import { LoggerModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [environment] }),
    LoggerModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
