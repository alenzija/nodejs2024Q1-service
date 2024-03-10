import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsInt, IsString, IsUUID } from 'class-validator';

export class Album {
  @ApiProperty({ format: 'uui4' })
  @IsUUID('4')
  @IsDefined()
  id: string;

  @ApiProperty({ default: 'Innuendo' })
  @IsString()
  @IsDefined()
  name: string;

  @ApiProperty({ default: 2024 })
  @IsInt()
  @IsDefined()
  year: number;

  @ApiPropertyOptional({
    type: 'string',
    nullable: true,
    format: 'uui4',
  })
  @IsString()
  artistId: string | null; // refers to Artist
}
