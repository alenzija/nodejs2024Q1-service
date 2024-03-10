import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';

export class AlbumDto {
  @IsString()
  @IsDefined()
  @ApiProperty({ default: 'Innuendo' })
  name: string;

  @IsInt()
  @IsDefined()
  @ApiProperty({ default: 2024 })
  year: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    nullable: true,
    format: 'uui4',
  })
  artistId: string | null; // refers to Artist
}
