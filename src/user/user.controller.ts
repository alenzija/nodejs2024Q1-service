import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/user/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiConsumes, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':uuid')
  async getUnique(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<User | null> {
    return this.userService.getUnique(uuid);
  }

  @Post()
  @ApiConsumes('application/json')
  @ApiCreatedResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async create(
    @Body(
      new ValidationPipe({
        stopAtFirstError: true,
        exceptionFactory: (errors) => {
          return new BadRequestException({
            statusCode: 404,
            message: Object.values(errors[0].constraints)[0],
          });
        },
      }),
    )
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }
}
