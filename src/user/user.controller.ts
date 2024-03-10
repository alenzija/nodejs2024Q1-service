import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';

import { User } from 'src/user/interfaces/user.interface';

import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserResponseDto } from './dto/userResponse.dto';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';

@ApiTags('User controller')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [UserResponseDto],
  })
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The user's id is not valid",
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The user with this id doesn't exist",
    type: ErrorResponseDto,
  })
  async getById(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<User | null> {
    return this.userService.getById(uuid);
  }

  @Post()
  @ApiConsumes('application/json')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    type: UserResponseDto,
    description: 'The user has been successfully created.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "Body doesn't contain required fields",
    type: ErrorResponseDto,
  })
  async create(
    @Body(new ValidationPipe())
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @Put(':uuid')
  @HttpCode(200)
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "the user's id is not valid",
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "the user with this id doesn't exist",
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'The old password is wrong',
    type: ErrorResponseDto,
  })
  async update(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
    @Body(new ValidationPipe())
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update({ id: uuid, body: updateUserDto });
  }

  @Delete(':uuid')
  @ApiConsumes('application/json')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'The user has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The user's id is not valid",
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The user with this id doesn't exist",
    type: ErrorResponseDto,
  })
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return this.userService.delete(uuid);
  }
}
