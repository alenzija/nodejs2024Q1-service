import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsString, IsUUID } from 'class-validator';

export class Album {
  @ApiProperty({ default: '21edb05f-f8c8-48a4-91f6-ec34cfec7a4b' })
  @IsUUID('4')
  @IsDefined()
  id: string;

  @ApiProperty({ default: 'AlbumName' })
  @IsString()
  @IsDefined()
  name: string;

  @ApiProperty({ default: 2024 })
  @IsInt()
  @IsDefined()
  year: number;

  @ApiProperty({
    type: 'string',
    nullable: true,
  })
  @IsString()
  artistId: string | null; // refers to Artist
}
