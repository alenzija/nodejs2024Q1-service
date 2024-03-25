import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/album/entity/album.entity';
import { Track } from 'src/track/entity/track.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @ApiProperty({
    format: 'uuid',
  })
  @PrimaryGeneratedColumn('uuid')
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

  @OneToMany(() => Track, (track) => track.artist)
  track: Track;

  @OneToMany(() => Album, (album) => album.artist)
  album: Album;
}
