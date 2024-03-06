import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class TrackDto {
  @IsString()
  @IsDefined()
  @ApiProperty()
  name: string;

  @IsUUID('4')
  @IsOptional()
  @ApiProperty()
  artistId?: string;

  @IsUUID('4')
  @IsOptional()
  @ApiProperty()
  albumId?: string;

  @IsInt()
  @IsDefined()
  @ApiProperty()
  duration: number;
}
