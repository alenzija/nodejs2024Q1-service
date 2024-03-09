import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Track } from './interfaces/track.interface';
import { DbService } from 'src/db/db.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class TrackService {
  constructor(
    private db: DbService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
  ) {}
  getAll() {
    return this.db.tracks;
  }

  getUnique(
    id: string,
    error: { statusCode: number; httpStatus: HttpStatus } = {
      statusCode: 404,
      httpStatus: HttpStatus.NOT_FOUND,
    },
  ): Track {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      const { statusCode, httpStatus } = error;
      throw new HttpException(
        {
          statusCode,
          message: "Track with this id doesn't exist",
        },
        httpStatus,
      );
    }
    return track;
  }

  create(track: Track): Track {
    const newTrack = {
      id: uuidv4(),
      ...track,
    };

    if (newTrack.artistId) {
      this.artistService.getUnique(newTrack.artistId, {
        statusCode: 422,
        httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      });
    } else {
      newTrack.artistId = null;
    }

    if (newTrack.albumId) {
      this.albumService.getUnique(newTrack.albumId, {
        statusCode: 422,
        httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      });
    } else {
      newTrack.albumId = null;
    }
    this.db.tracks.push(newTrack);
    return newTrack;
  }

  update({ id, body }: { id: string; body: Track }): Track {
    const track = this.getUnique(id);
    Object.keys(body).forEach((key) => {
      if (body[key]) {
        track[key] = body[key];
      }
    });

    return track;
  }

  delete(id: string): void {
    this.getUnique(id);
    this.db.tracks = this.db.tracks.filter((track) => track.id !== id);
    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  setArtistIdNull(artistId: string): void {
    this.db.tracks = this.db.tracks.map((track) =>
      track.artistId === artistId ? { ...track, artistId: null } : track,
    );
  }

  setAlbumIdNull(albumId: string): void {
    this.db.tracks = this.db.tracks.map((track) =>
      track.albumId === albumId ? { ...track, albumId: null } : track,
    );
  }
}
