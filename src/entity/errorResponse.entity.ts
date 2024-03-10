import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ErrorResponse {
  @ApiProperty()
  @IsInt()
  statusCode: number;

  @ApiProperty()
  @IsString()
  message: string;
}
