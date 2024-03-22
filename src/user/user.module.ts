import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserResponse } from './entity/userResponse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserResponse])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
