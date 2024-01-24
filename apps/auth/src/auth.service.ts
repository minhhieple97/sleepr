import { Response } from 'express';
import { UserDocument } from './users/models/user.schema';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  login(user: UserDocument, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };
    const tokenExpireTime = new Date();
    tokenExpireTime.setSeconds(
      tokenExpireTime.getSeconds() +
        +this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    );
    const accessToken = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', accessToken, {
      httpOnly: true,
      expires: tokenExpireTime,
    });
  }
}
