import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Album } from './interface/album.interface';
import { DbService } from 'src/db/db.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(private db: DbService, private trackService: TrackService) {}

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

  create(album: Album): Album {
    const newAlbum = {
      id: uuidv4(),
      ...album,
    };
    if (!newAlbum.artistId) {
      newAlbum.artistId = null;
    }
    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  update({ id, body }: { id: string; body: Album }): Album {
    const album = this.getUnique(id);
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
    this.db.albums.map((item) =>
      item.artistId === artistId ? { ...item, artistId: null } : item,
    );
  }
}
