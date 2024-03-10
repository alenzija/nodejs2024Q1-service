import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Artist } from './entity/artist.entity';
import { DbService } from 'src/db/db.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => DbService))
    private db: DbService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  getAll() {
    return this.db.artists;
  }

  getUnique(
    id: string,
    error: { statusCode: number; httpStatus: HttpStatus } = {
      statusCode: 404,
      httpStatus: HttpStatus.NOT_FOUND,
    },
  ): Artist {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) {
      const { statusCode, httpStatus } = error;
      throw new HttpException(
        {
          statusCode,
          message: "Artist with this id doesn't exist",
        },
        httpStatus,
      );
    }
    return artist;
  }

  create(artist: ArtistDto): Artist {
    const newArtist = {
      id: uuidv4(),
      ...artist,
    };
    this.db.artists.push(newArtist);
    return newArtist;
  }

  update({ id, body }: { id: string; body: ArtistDto }): Artist {
    const artist = this.getUnique(id);
    Object.keys(body).forEach((key) => {
      artist[key] = body[key];
    });

    return artist;
  }

  delete(id: string): void {
    this.getUnique(id);
    this.db.artists = this.db.artists.filter((artist) => artist.id !== id);
    this.albumService.setArtistIdNull(id);
    this.trackService.setArtistIdNull(id);
    this.db.favorites.artists = this.db.favorites.artists.filter(
      (artisId) => artisId !== id,
    );
  }
}
