import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class ArtistDto {
  @IsString()
  @IsDefined()
  @ApiProperty({
    default: 'Freddie Mercury',
  })
  name: string;

  @IsBoolean()
  @IsDefined()
  @ApiProperty({
    default: true,
  })
  grammy: boolean;
}
