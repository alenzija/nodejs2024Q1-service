import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { DbService } from 'src/db/db.service';
import { UserResponse } from './entity/userResponse.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(forwardRef(() => DbService))
    private db: DbService,
  ) {}

  transformToResponseUser(user: UserResponse): UserResponse {
    return { ...user, password: undefined };
  }

  getAll(): UserResponse[] {
    return this.db.users.map(this.transformToResponseUser);
  }

  getById(id: string): UserResponse {
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

  getByLogin(login: string): UserResponse {
    const user = this.db.users.find((user) => user.login === login);
    return user;
  }

  create(user: CreateUserDto): UserResponse {
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
    body: UpdateUserDto;
  }): UserResponse {
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
