import { Module, forwardRef } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { DbModule } from 'src/db/db.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

@Module({
  imports: [SequelizeModule.forFeature([User]), forwardRef(() => DbModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
