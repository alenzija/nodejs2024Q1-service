import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString, IsUUID } from 'class-validator';

export class ArtistResponseDto {
  @IsUUID('4')
  @ApiProperty({
    default: 'a9d9877b-f788-4da4-9f66-f468150c3755',
  })
  id: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    default: 'artistName',
  })
  name: string;

  @IsBoolean()
  @ApiProperty({
    default: true,
  })
  grammy: boolean;
}
