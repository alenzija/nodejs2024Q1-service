import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Artist {
  @ApiProperty({
    format: 'uuid',
  })
  @PrimaryColumn({
    type: 'uuid',
    unique: true,
    nullable: false,
  })
  id: string;

  @ApiProperty({
    default: 'Freddie Mercury',
  })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @ApiProperty({
    default: true,
  })
  @Column({
    type: 'boolean',
    nullable: false,
  })
  grammy: boolean;
}
