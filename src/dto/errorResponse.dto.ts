import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ErrorResponseDto {
  @ApiProperty()
  @IsInt()
  statusCode: number;

  @ApiProperty()
  @IsString()
  message: string;
}
