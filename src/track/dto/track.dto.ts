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
  @ApiProperty({
    default: 'The Show Must Go On',
  })
  name: string;

  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional({
    format: 'uui4',
    nullable: true,
  })
  artistId?: string;

  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional({
    format: 'uui4',
    nullable: true,
  })
  albumId?: string;

  @IsInt()
  @IsDefined()
  @ApiProperty({
    type: 'integer',
    description: 'In seconds',
    default: 300,
  })
  duration: number;
}
