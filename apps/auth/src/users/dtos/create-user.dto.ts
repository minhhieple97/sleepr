import { IsEmail, IsString, IsStrongPassword, Min } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
