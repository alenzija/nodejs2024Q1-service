import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class Track {
  @IsUUID('4')
  @IsDefined()
  @ApiProperty({
    format: 'uui4',
  })
  id: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    default: 'The Show Must Go On',
  })
  name: string;

  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
    format: 'uui4',
  })
  artistId?: string;

  @IsUUID('4')
  @IsOptional()
  @ApiPropertyOptional({
    nullable: true,
    format: 'uui4',
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
