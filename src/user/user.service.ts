import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/interfaces/user.interface';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePassword } from './interfaces/updatePassword.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  getUnique(id: string): User | null {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException(
        {
          statusCode: 404,
          message: "User with this id doesn't exist",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  create(user: User): User {
    const newUser = {
      id: uuidv4(),
      ...user,
      version: 1,
      createdAt: Date.now(),
      updatedAt: null,
    };
    this.users.push(newUser);
    return newUser;
  }

  update({
    id,
    body: { oldPassword, newPassword },
  }: {
    id: string;
    body: UpdatePassword;
  }): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException(
        {
          status: 404,
          message: "User with this id doesn't exist",
        },
        HttpStatus.NOT_FOUND,
      );
    }
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

  delete(id: string): void {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException(
        {
          statusCode: 404,
          message: "User with this id doesn't exist",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    this.users = this.users.filter((user) => user.id !== id);
  }
}
