import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Track } from './interfaces/track.interface';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  async getAll() {
    return this.tracks;
  }

  async getUnique(id: string): Promise<Track> {
    const track = this.tracks.find((track) => track.id === id);
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

    this.tracks.push(newTrack);
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
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
