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

  @ApiProperty({ default: Date.now() })
  @IsDefined()
  @IsInt()
  createdAt: number;

  @ApiProperty({ default: Date.now() })
  @IsDefined()
  @IsInt()
  updatedAt: number;

  @IsString()
  @IsOptional()
  password?: string;
}
