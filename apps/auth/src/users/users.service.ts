import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  createUser(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }
}
