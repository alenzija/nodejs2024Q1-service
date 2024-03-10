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

import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserResponse } from './entity/userResponse.entity';
import { ErrorResponse } from 'src/entity/errorResponse.entity';

@ApiTags('User controller')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [UserResponse],
  })
  async getAll(): Promise<UserResponse[]> {
    return this.userService.getAll();
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The user's id is not valid",
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The user with this id doesn't exist",
    type: ErrorResponse,
  })
  async getById(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<UserResponse | null> {
    return this.userService.getById(uuid);
  }

  @Post()
  @ApiConsumes('application/json')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    type: UserResponse,
    description: 'The user has been successfully created.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "Body doesn't contain required fields",
    type: ErrorResponse,
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
    type: UserResponse,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "the user's id is not valid",
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "the user with this id doesn't exist",
    type: ErrorResponse,
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'The old password is wrong',
    type: ErrorResponse,
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
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The user with this id doesn't exist",
    type: ErrorResponse,
  })
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return this.userService.delete(uuid);
  }
}
