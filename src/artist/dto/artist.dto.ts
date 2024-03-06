import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class ArtistDto {
  @IsString()
  @IsDefined()
  @ApiProperty()
  name: string;

  @IsBoolean()
  @IsDefined()
  @ApiProperty()
  grammy: boolean;
}
