import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Track } from './interfaces/track.interface';
import { DbService } from 'src/db/db.service';

@Injectable()
export class TrackService {
  constructor(private db: DbService) {}
  async getAll() {
    return this.db.tracks;
  }

  async getUnique(id: string): Promise<Track> {
    const track = this.db.tracks.find((track) => track.id === id);
    if (!track) {
      throw new HttpException(
        {
          statusCode: 404,
          message: "Track with this id doesn't exist",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return track;
  }

  async create(track: Track): Promise<Track> {
    const newTrack = {
      id: uuidv4(),
      ...track,
    };

    newTrack.artistId = newTrack.artistId || null;
    newTrack.albumId = newTrack.albumId || null;

    this.db.tracks.push(newTrack);
    return newTrack;
  }

  async update({ id, body }: { id: string; body: Track }): Promise<Track> {
    const track = await this.getUnique(id);
    Object.keys(body).forEach((key) => {
      if (body[key]) {
        track[key] = body[key];
      }
    });

    return track;
  }

  async delete(id: string): Promise<void> {
    await this.getUnique(id);
    this.db.tracks = this.db.tracks.filter((track) => track.id !== id);
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
