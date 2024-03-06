import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsDefined({
    message: 'login is required',
  })
  @IsString({
    message: 'login must be a string',
  })
  login: string;

  @ApiProperty()
  @IsDefined({
    message: 'password is required',
  })
  @IsString({
    message: 'password must be a string',
  })
  password: string;
}
