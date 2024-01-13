import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { XataClient } from 'src/config/xata';
import { CreateUserDto } from './dto/create.schema';

@Injectable()
export class UserService {
  constructor(private readonly xataClient: XataClient) {}

  async getByUsername(username: string) {
    const user = this.xataClient.db.users
      .select(['id', 'name', 'username', 'password'])
      .getFirst({
        filter: { username },
      });

    if (!user)
      throw new HttpException(
        'User with this username does not exist',
        HttpStatus.NOT_FOUND,
      );

    return user;
  }

  create(userData: CreateUserDto) {
    return this.xataClient.db.users.create(userData);
  }

  async getById(id: string) {
    const user = await this.xataClient.db.users
      .select(['id', 'name', 'username'])
      .getFirst({ filter: { id } });

    if (user) return user;

    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
