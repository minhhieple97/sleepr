import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { LoggerModule } from '@app/common/logger';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import environment from './config/environment';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersRepository } from './users/users.repository';
import { DatabaseModule } from '@app/common';
import { UsersService } from './users/users.service';
import { UserDocument, UserSchema } from './users/models/user.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    UsersModule,
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, load: [environment] }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          )}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, UsersRepository],
})
export class AuthModule {}
