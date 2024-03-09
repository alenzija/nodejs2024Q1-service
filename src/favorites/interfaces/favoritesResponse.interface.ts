import { Album } from 'src/album/interface/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Track } from 'src/track/interfaces/track.interface';

export interface FavoritesResponse {
  artists: Artist[];
  tracks: Track[];
  albums: Album[];
}
