import { Module, forwardRef } from '@nestjs/common';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { DbModule } from 'src/db/db.module';

@Module({
  imports: [forwardRef(() => DbModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
