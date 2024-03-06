import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  async getAll() {
    return this.artists;
  }

  async getUnique(id: string): Promise<Artist> {
    const artist = this.artists.find((artist) => artist.id === id);
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

  async create(artist: Artist): Promise<Artist> {
    const newArtist = {
      id: uuidv4(),
      ...artist,
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  async update({ id, body }: { id: string; body: Artist }): Promise<Artist> {
    const artist = this.getUnique(id);
    Object.keys(body).forEach((key) => {
      if (body[key]) {
        artist[key] = body[key];
      }
    });

    return artist;
  }

  async delete(id: string): Promise<void> {
    await this.getUnique(id);
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
