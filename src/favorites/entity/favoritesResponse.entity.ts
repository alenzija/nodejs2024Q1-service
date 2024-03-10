import { ApiProperty } from '@nestjs/swagger';

import { Album } from 'src/album/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { Track } from 'src/track/entity/track.entity';

export class FavoritesResponse {
  @ApiProperty({
    type: [Artist],
  })
  artists: Artist[];

  @ApiProperty({
    type: [Track],
  })
  tracks: Track[];

  @ApiProperty({
    type: [Album],
  })
  albums: Album[];
}
