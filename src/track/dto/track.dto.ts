import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional({
    nullable: true,
  })
  artistId?: string;

  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
  })
  albumId?: string;

  @IsInt()
  @IsDefined()
  @ApiProperty()
  duration: number;
}
