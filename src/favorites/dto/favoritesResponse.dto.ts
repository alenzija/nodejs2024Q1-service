import { ApiProperty } from '@nestjs/swagger';

import { AlbumResponseDto } from 'src/album/dto/albumResponse.dto';
import { ArtistResponseDto } from 'src/artist/dto/artistResponse.dto';
import { TrackResponseDto } from 'src/track/dto/trackResponse.dto';

export class FavoritesResponseDto {
  @ApiProperty({
    type: [ArtistResponseDto],
  })
  artists: ArtistResponseDto[];

  @ApiProperty({
    type: [TrackResponseDto],
  })
  tracks: TrackResponseDto[];

  @ApiProperty({
    type: [AlbumResponseDto],
  })
  albums: TrackResponseDto[];
}
