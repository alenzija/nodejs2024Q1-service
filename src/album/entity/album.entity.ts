import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Artist } from 'src/artist/entity/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @ApiProperty({ format: 'uui4' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ default: 'Innuendo' })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @ApiProperty({ default: 2024 })
  @Column({
    type: 'int',
    nullable: false,
  })
  year: number;

  @ApiPropertyOptional({
    type: 'string',
    nullable: true,
    format: 'uui4',
  })
  @OneToOne(() => Artist, { cascade: true })
  @JoinColumn()
  artist: Artist; // refers to Artist
}
