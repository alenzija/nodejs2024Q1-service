import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class UserResponse {
  @ApiProperty({
    format: 'uui4',
  })
  @IsDefined()
  @IsUUID('4')
  id: string;

  @ApiProperty({ default: 'loginName' })
  @IsDefined()
  @IsString()
  login: string;

  @ApiProperty({ default: 1 })
  @IsDefined()
  @IsInt()
  version: number;

  @ApiProperty()
  @IsDefined()
  createdAt: number | Date;

  @ApiProperty()
  @IsDefined()
  updatedAt: number | Date;

  @IsString()
  @IsOptional()
  password?: string;
}
