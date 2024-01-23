import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import environment from 'config/environment';
@Module({
  imports: [NestConfigModule.forRoot({ isGlobal: true, load: [environment] })],
})
export class ConfigModule {} 
