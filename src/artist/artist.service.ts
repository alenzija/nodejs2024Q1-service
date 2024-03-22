import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { DbService } from 'src/db/db.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { ArtistDto } from './dto/artist.dto';
import { Artist } from './entity/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artists: Repository<Artist>,
    @Inject(forwardRef(() => DbService))
    private db: DbService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async getAll() {
    return await this.artists.find();
  }

  async getUnique(
    id: string,
    error: { statusCode: number; httpStatus: HttpStatus } = {
      statusCode: 404,
      httpStatus: HttpStatus.NOT_FOUND,
    },
  ) {
    const artist = await this.artists.findOneBy({ id });
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
    const newArtist = new Artist();
    newArtist.id = uuidv4();
    newArtist.name = artist.name;
    newArtist.grammy = artist.grammy;

    await this.artists.save(newArtist);
    return newArtist;
  }

  async update({ id, body }: { id: string; body: ArtistDto }) {
    const artist = await this.getUnique(id);
    artist.name = body.name;
    artist.grammy = body.grammy;
    await this.artists.save(artist);
    return artist;
  }

  async delete(id: string) {
    await this.getUnique(id);
    this.artists.delete(id);

    this.albumService.setArtistIdNull(id);
    this.trackService.setArtistIdNull(id);
    this.db.favorites.artists = this.db.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}
