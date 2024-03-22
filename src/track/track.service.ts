import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Track } from './entity/track.entity';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackDto } from './dto/track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private tracks: Repository<Track>,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
  ) {}
  async getAll() {
    const tracks = await this.tracks.find({
      relations: ['artist', 'album'],
    });
    return tracks.map((track) => ({
      ...track,
      artistId: track.artist ? track.artist.id : null,
      albumId: track.album ? track.album.id : null,
      artist: undefined,
      album: undefined,
    }));
  }

  async getUnique(
    id: string,
    error: { statusCode: number; httpStatus: HttpStatus } = {
      statusCode: 404,
      httpStatus: HttpStatus.NOT_FOUND,
    },
  ) {
    const track = await this.tracks.findOneBy({ id });
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
    return {
      ...track,
      artistId: track.artist ? track.artist.id : null,
      albumId: track.album ? track.album.id : null,
      artist: undefined,
      album: undefined,
    };
  }

  async create(track: TrackDto) {
    const newTrack = new Track();
    newTrack.duration = track.duration;
    newTrack.name = track.name;

    if (track.artistId) {
      const artist = await this.artistService.getUnique(track.artistId, {
        statusCode: 422,
        httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      });
      newTrack.artist = artist;
    } else {
      newTrack.artist = null;
    }

    if (track.albumId) {
      const album = await this.albumService.getUnique(track.albumId, {
        statusCode: 422,
        httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      });
      newTrack.album = album;
    } else {
      newTrack.album = null;
    }

    await this.tracks.save(newTrack);
    return newTrack;
  }

  async update({ id, body }: { id: string; body: TrackDto }) {
    const track = await this.getUnique(id);
    if (body.artistId) {
      const artist = await this.artistService.getUnique(body.artistId, {
        statusCode: 422,
        httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      });
      track.artist = artist;
    } else {
      track.artist = null;
    }

    if (body.albumId) {
      const album = await this.albumService.getUnique(body.albumId, {
        statusCode: 422,
        httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      });
      track.album = album;
    } else {
      track.album = null;
    }

    track.name = body.name;
    track.duration = body.duration;

    await this.tracks.save(track);
    return track;
  }

  async delete(id: string) {
    await this.getUnique(id);
    await this.tracks.delete({ id });
  }
}
