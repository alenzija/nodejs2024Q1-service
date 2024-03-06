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
import { UserService } from './user.service';
import { User } from 'src/user/interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('User controller')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':uuid')
  async getById(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<User | null> {
    return this.userService.getById(uuid);
  }

  @Post()
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async create(
    @Body(new ValidationPipe())
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @Put(':uuid')
  @ApiConsumes('application/json')
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
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
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return this.userService.delete(uuid);
  }
}
