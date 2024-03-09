import { Injectable } from '@nestjs/common';
import { Album } from 'src/album/interface/album.interface';
import { Artist } from 'src/artist/interfaces/artist.interface';
import { Track } from 'src/track/interfaces/track.interface';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class DbService {
  users: User[] = [];
  artists: Artist[] = [];
  albums: Album[] = [];
  tracks: Track[] = [];

  // getUserAlbums(userId: number): Album[] {
  //   const user = this.users.find(u => u.id === userId);
  //   if (!user) {
  //     return []; // User not found
  //   }
  //   return user.albums;
  // }
}
