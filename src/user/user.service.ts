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
  // private users: User[] = [];

  async getAll(): Promise<User[]> {
    return this.db.users.map((user) => ({ ...user, password: '******' }));
  }

  async getById(id: string): Promise<User> {
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

  async getByLogin(login: string): Promise<User> {
    const user = this.db.users.find((user) => user.login === login);
    return user;
  }

  async create(user: User): Promise<User> {
    const currentUser = await this.getByLogin(user.login);
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
      updatedAt: null,
    };
    this.db.users.push(newUser);
    return newUser;
  }

  async update({
    id,
    body: { oldPassword, newPassword },
  }: {
    id: string;
    body: UpdatePassword;
  }): Promise<User> {
    const user = await this.getById(id);
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

    return user;
  }

  async delete(id: string): Promise<void> {
    await this.getById(id);
    this.db.users = this.db.users.filter((user) => user.id !== id);
  }
}
