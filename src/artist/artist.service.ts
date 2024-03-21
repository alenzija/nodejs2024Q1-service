import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuidv4 } from 'uuid';

import { Artist } from './artist.model';
import { DbService } from 'src/db/db.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistDto } from './dto/artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist)
    private artists: typeof Artist,
    @Inject(forwardRef(() => DbService))
    private db: DbService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async getAll() {
    return await this.artists.findAll();
  }

  async getUnique(
    id: string,
    error: { statusCode: number; httpStatus: HttpStatus } = {
      statusCode: 404,
      httpStatus: HttpStatus.NOT_FOUND,
    },
  ) {
    const artist = await this.artists.findOne({ where: { id } });
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

  async create(artist: ArtistDto) {
    const newArtist = {
      id: uuidv4(),
      ...artist,
    };
    await this.artists.create(newArtist);
    return newArtist;
  }

  async update({ id, body }: { id: string; body: ArtistDto }) {
    const artist = await this.getUnique(id);
    await artist.update({ ...body });
    const updatedArtist = await this.getUnique(id);
    return updatedArtist;
  }

  async delete(id: string) {
    const artist = await this.getUnique(id);
    artist.destroy();

    this.albumService.setArtistIdNull(id);
    this.trackService.setArtistIdNull(id);
    this.db.favorites.artists = this.db.favorites.artists.filter(
      (artisId) => artisId !== id,
    );
  }
}
