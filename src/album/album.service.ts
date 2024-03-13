import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Album } from './entity/album.entity';
import { DbService } from 'src/db/db.service';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => DbService))
    private db: DbService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  getAll() {
    return this.db.albums;
  }

  getUnique(
    id: string,
    error: { statusCode: number; httpStatus: HttpStatus } = {
      statusCode: 404,
      httpStatus: HttpStatus.NOT_FOUND,
    },
  ): Album {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      const { statusCode, httpStatus } = error;
      throw new HttpException(
        {
          statusCode,
          message: "Album with this id doesn't exist",
        },
        httpStatus,
      );
    }
    return album;
  }

  create(album: AlbumDto): Album {
    const newAlbum = {
      id: uuidv4(),
      ...album,
    };
    if (newAlbum.artistId) {
      this.artistService.getUnique(newAlbum.artistId, {
        statusCode: 422,
        httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      });
    } else {
      newAlbum.artistId = null;
    }

    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  update({ id, body }: { id: string; body: AlbumDto }): Album {
    const album = this.getUnique(id);
    if (body.artistId) {
      this.artistService.getUnique(body.artistId, {
        statusCode: 422,
        httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      });
    }
    Object.keys(body).forEach((key) => {
      if (body[key]) {
        album[key] = body[key];
      }
    });

    return album;
  }

  delete(id: string): void {
    this.getUnique(id);
    this.db.albums = this.db.albums.filter((album) => album.id !== id);
    this.trackService.setAlbumIdNull(id);
    this.db.favorites.albums = this.db.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  setArtistIdNull(artistId: string): void {
    this.db.albums = this.db.albums.map((item) =>
      item.artistId === artistId ? { ...item, artistId: null } : item,
    );
  }
}
