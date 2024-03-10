import { Injectable } from '@nestjs/common';

import { Album } from 'src/album/entity/album.entity';
import { Artist } from 'src/artist/entity/artist.entity';
import { Favorites } from 'src/favorites/interfaces/favorites.interface';
import { Track } from 'src/track/entity/track.entity';
import { UserResponse } from 'src/user/entity/userResponse.entity';

@Injectable()
export class DbService {
  users: UserResponse[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];
  favorites: Favorites = {
    artists: [],
    tracks: [],
    albums: [],
  };
}
