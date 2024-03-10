import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsString, IsUUID } from 'class-validator';

export class UserResponseDto {
  @ApiProperty({ default: '21edb05f-f8c8-48a4-91f6-ec34cfec7a4b' })
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
}
