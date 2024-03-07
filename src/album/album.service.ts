import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Album } from './interface/album.interface';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  async getAll() {
    return this.albums;
  }

  async getUnique(id: string): Promise<Album> {
    const artist = this.albums.find((album) => album.id === id);
    if (!artist) {
      throw new HttpException(
        {
          statusCode: 404,
          message: "Artist with this id doesn't exist",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return artist;
  }

  async create(artist: Album): Promise<Album> {
    const newAlbum = {
      id: uuidv4(),
      ...artist,
    };
    if (!newAlbum.artistId) {
      newAlbum.artistId = null;
    }
    this.albums.push(newAlbum);
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
    this.albums = this.albums.filter((album) => album.id !== id);
  }
}
