import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  artistId: string | null; // refers to Artist
}
