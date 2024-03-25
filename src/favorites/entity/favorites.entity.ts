import { ApiProperty } from '@nestjs/swagger';

import { Album } from 'src/album/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { Track } from 'src/track/entity/track.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @ApiProperty({
    type: [Artist],
  })
  @ManyToMany(() => Artist, {
    cascade: ['remove'],
  })
  @JoinTable()
  artists: Artist[];

  @ApiProperty({
    type: [Track],
  })
  @ManyToMany(() => Track, { cascade: ['remove'] })
  @JoinTable()
  tracks: Track[];

  @ApiProperty({
    type: [Album],
  })
  @ManyToMany(() => Album, { cascade: ['remove'] })
  @JoinTable()
  albums: Album[];
}
