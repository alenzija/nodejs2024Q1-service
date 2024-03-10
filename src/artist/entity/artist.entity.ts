import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString, IsUUID } from 'class-validator';

export class Artist {
  @IsUUID('4')
  @ApiProperty({
    format: 'uuid',
  })
  id: string;

  @IsString()
  @IsDefined()
  @ApiProperty({
    default: 'Freddie Mercury',
  })
  name: string;

  @IsBoolean()
  @ApiProperty({
    default: true,
  })
  grammy: boolean;
}
