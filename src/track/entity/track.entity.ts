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
    default: 'a9d9877b-f788-4da4-9f66-f468150c3755',
  })
  id: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    default: 'trackName',
  })
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
  @ApiProperty({
    default: 300,
  })
  duration: number;
}
