import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Album } from 'src/album/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Track {
  @ApiProperty({
    format: 'uui4',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    default: 'The Show Must Go On',
  })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @ApiPropertyOptional({
    nullable: true,
    format: 'uui4',
  })
  @ManyToOne(() => Artist, {
    cascade: ['update'],
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  artist: Artist;

  @ApiPropertyOptional({
    nullable: true,
    format: 'uui4',
  })
  @ManyToOne(() => Album, {
    cascade: ['update'],
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  album: Album;

  @ApiProperty({
    type: 'integer',
    description: 'In seconds',
    default: 300,
  })
  @Column({
    type: 'int',
    nullable: false,
  })
  duration: number;
}
