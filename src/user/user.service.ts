import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { UserResponse } from './entity/userResponse.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserResponse)
    private users: Repository<UserResponse>,
  ) {}

  transformToResponseUser(user: UserResponse) {
    return {
      ...user,
      password: undefined,
      createdAt: +new Date(user.createdAt),
      updatedAt: +new Date(user.updatedAt),
    };
  }

  async getAll() {
    return await this.users.find();
  }

  async getById(id: string) {
    const user = await this.users.findOneBy({ id });
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

  async getByLogin(login: string) {
    const user = await this.users.findOneBy({ login });
    return user;
  }

  async create(user: CreateUserDto) {
    const currentUser = await this.getByLogin(user.login);
    if (currentUser) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'User with this login is already exist',
      });
    }
    const id = uuidv4();
    const newUser = new UserResponse();
    newUser.id = id;
    newUser.login = user.login;
    newUser.password = user.password;
    newUser.version = 1;
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();

    await this.users.save(newUser);
    return this.transformToResponseUser(newUser);
  }

  async update({
    id,
    body: { oldPassword, newPassword },
  }: {
    id: string;
    body: UpdateUserDto;
  }) {
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
    const newUpdatedAt = new Date();
    const newVersion = user.version + 1;
    user.updatedAt = newUpdatedAt;
    user.version = newVersion;
    user.password = newPassword;
    await this.users.save(user);

    return this.transformToResponseUser(user);
  }

  async delete(id: string) {
    await this.getById(id);
    await this.users.delete(id);
  }
}
