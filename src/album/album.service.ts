import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Album } from './interface/album.interface';
import { DbService } from 'src/db/db.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  constructor(private db: DbService, private trackService: TrackService) {}

  async getAll() {
    return this.db.albums;
  }

  async getUnique(id: string): Promise<Album> {
    const album = this.db.albums.find((album) => album.id === id);
    if (!album) {
      throw new HttpException(
        {
          statusCode: 404,
          message: "Album with this id doesn't exist",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return album;
  }

  async create(album: Album): Promise<Album> {
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

  async update({ id, body }: { id: string; body: Album }): Promise<Album> {
    const album = this.getUnique(id);
    Object.keys(body).forEach((key) => {
      if (body[key]) {
        album[key] = body[key];
      }
    });

    return album;
  }

  async delete(id: string): Promise<void> {
    await this.getUnique(id);
    this.db.albums = this.db.albums.filter((album) => album.id !== id);
    this.trackService.setAlbumIdNull(id);
  }

  setArtistIdNull(artistId: string): void {
    this.db.albums.map((item) =>
      item.artistId === artistId ? { ...item, artistId: null } : item,
    );
  }
}
