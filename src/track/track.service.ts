import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { Track } from './interfaces/track.interface';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  async getAll() {
    return this.tracks;
  }

  getUnique(id: string): Track {
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

  create(track: Track): Track {
    const newTrack = {
      id: uuidv4(),
      ...track,
    };

    newTrack.artistId = newTrack.artistId || null;
    newTrack.albumId = newTrack.albumId || null;

    this.tracks.push(newTrack);
    return newTrack;
  }

  update({ id, body }: { id: string; body: Track }): Track {
    const user = this.tracks.find((track) => track.id === id);
    if (!user) {
      throw new HttpException(
        {
          status: 404,
          message: "Track with this id doesn't exist",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    Object.keys(body).forEach((key) => {
      if (body[key]) {
        user[key] = body[key];
      }
    });

    return user;
  }

  delete(id: string): void {
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
    this.tracks = this.tracks.filter((track) => track.id !== id);
  }
}
