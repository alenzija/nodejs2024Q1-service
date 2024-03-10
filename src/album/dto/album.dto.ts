import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';

export class AlbumDto {
  @IsString()
  @IsDefined()
  @ApiProperty()
  name: string;

  @IsInt()
  @IsDefined()
  @ApiProperty()
  year: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: 'string',
    nullable: true,
  })
  artistId: string | null; // refers to Artist
}
