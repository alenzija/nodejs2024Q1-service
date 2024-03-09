import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { v4 as uuidv4 } from 'uuid';

import { UpdatePassword } from './interfaces/updatePassword.interface';
import { User } from 'src/user/interfaces/user.interface';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  transformToResponseUser(user: User): User {
    return { ...user, password: undefined };
  }

  getAll(): User[] {
    return this.db.users.map(this.transformToResponseUser);
  }

  getById(id: string): User {
    const user = this.db.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException(
        {
          statusCode: 400,
          message: "User with this id doesn't exist",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  getByLogin(login: string): User {
    const user = this.db.users.find((user) => user.login === login);
    return user;
  }

  create(user: User): User {
    const currentUser = this.getByLogin(user.login);
    if (currentUser) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'User with this login is already exist',
      });
    }
    const newUser = {
      id: uuidv4(),
      ...user,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.db.users.push(newUser);

    return this.transformToResponseUser(newUser);
  }

  update({
    id,
    body: { oldPassword, newPassword },
  }: {
    id: string;
    body: UpdatePassword;
  }): User {
    const user = this.getById(id);
    if (user.password !== oldPassword) {
      throw new HttpException(
        {
          status: 403,
          message: 'Old password is wrong',
        },
        HttpStatus.FORBIDDEN,
      );
    }
    if (newPassword === oldPassword) {
      throw new HttpException(
        {
          status: 403,
          message: "An old password and a new password can't be same",
        },
        HttpStatus.FORBIDDEN,
      );
    }

    user.password = newPassword;
    user.version = user.version + 1;
    user.updatedAt = Date.now();

    return this.transformToResponseUser(user);
  }

  delete(id: string): void {
    this.getById(id);
    this.db.users = this.db.users.filter((user) => user.id !== id);
  }
}
