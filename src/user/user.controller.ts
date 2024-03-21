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
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';

import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserResponse } from './entity/userResponse.entity';

@ApiTags('User controller')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Gets all users',
  })
  @ApiResponse({
    status: 200,
    description: 'Gets all users',
    type: [UserResponse],
    content: { 'application/json': {} },
  })
  async getAll() {
    return await this.userService.getAll();
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Gets single user by id',
  })
  @ApiResponse({
    status: 200,
    type: UserResponse,
    description: 'Successful operation',
    content: { 'application/json': {} },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User was not found',
  })
  async getById(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ) {
    return await this.userService.getById(uuid);
  }

  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Creates a new user',
  })
  @ApiBody({ type: CreateUserDto, required: true })
  @ApiResponse({
    status: 201,
    type: UserResponse,
    description: 'The user has been created.',
    content: { 'application/json': {} },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. Body does not contain required fields',
  })
  async create(
    @Body(new ValidationPipe())
    createUserDto: CreateUserDto,
  ) {
    return await this.userService.create(createUserDto);
  }

  @Put(':uuid')
  @HttpCode(200)
  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiBody({ type: UpdateUserDto, required: true })
  @ApiResponse({
    status: 200,
    description: 'The user has been updated.',
    type: UserResponse,
    content: { 'application/json': {} },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User was not found',
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'oldPassword is wrong',
  })
  async update(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
    @Body(new ValidationPipe())
    updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update({ id: uuid, body: updateUserDto });
  }

  @Delete(':uuid')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes user by ID.',
  })
  @ApiResponse({
    status: 204,
    description: 'The user has been deleted.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'User was not found',
  })
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return await this.userService.delete(uuid);
  }
}
