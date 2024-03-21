import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { UserResponse } from './entity/userResponse.entity';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private users: typeof User,
  ) {}

  transformToResponseUser(user: User | UserResponse): UserResponse {
    const responseUser = 'dataValues' in user ? user.dataValues : user;

    return {
      ...responseUser,
      password: undefined,
      createdAt: +new Date(user.createdAt),
      updatedAt: +new Date(user.updatedAt),
    };
  }

  async getAll() {
    return await this.users.findAll();
  }

  async getById(id: string) {
    const user = await this.users.findOne({ where: { id } });
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
    const user = await this.users.findOne({ where: { login } });
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
    const newUser = {
      id,
      ...user,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await this.users.create(newUser);
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
    await user.update({
      ...user,
      password: newPassword,
      version: newVersion,
      updatedAt: newUpdatedAt,
    });

    const updatedUser = await this.getById(id);

    return this.transformToResponseUser(updatedUser);
  }

  async delete(id: string) {
    const user = await this.getById(id);
    await user.destroy();
  }
}
