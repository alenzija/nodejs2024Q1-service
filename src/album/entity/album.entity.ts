import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Artist } from 'src/artist/entity/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
    name: 'artistId',
    type: 'string',
    nullable: true,
    format: 'uui4',
  })
  @ManyToOne(() => Artist, {
    cascade: ['update'],
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: Artist; // refers to Artist
}
