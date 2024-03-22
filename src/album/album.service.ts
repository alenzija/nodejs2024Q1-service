import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Album } from './entity/album.entity';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumDto } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albums: Repository<Album>,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
  ) {}

  async getAll() {
    const albums = await this.albums.find({
      relations: ['artist'],
    });
    return albums.map((album) => ({
      ...album,
      artistId: album.artist ? album.artist.id : null,
      artist: undefined,
    }));
  }

  async getUnique(
    id: string,
    error: { statusCode: number; httpStatus: HttpStatus } = {
      statusCode: 404,
      httpStatus: HttpStatus.NOT_FOUND,
    },
  ) {
    const album = await this.albums.findOne({
      where: { id },
      relations: ['artist'],
    });
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
    return {
      ...album,
      artistId: album.artist ? album.artist.id : null,
      artist: undefined,
    };
  }

  async create(album: AlbumDto) {
    const newAlbum = new Album();
    newAlbum.name = album.name;
    newAlbum.year = album.year;

    if (album.artistId) {
      const artist = await this.artistService.getUnique(album.artistId, {
        statusCode: 422,
        httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      });
      newAlbum.artist = artist;
    } else {
      newAlbum.artist = null;
    }

    await this.albums.save(newAlbum);
    return {
      ...newAlbum,
      artistId: newAlbum.artist ? newAlbum.artist.id : null,
      artist: undefined,
    };
  }

  async update({ id, body }: { id: string; body: AlbumDto }) {
    const album = await this.getUnique(id);
    if (body.artistId) {
      const artist = await this.artistService.getUnique(body.artistId, {
        statusCode: 422,
        httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      });
      album.artist = artist;
    }

    album.name = body.name;
    album.year = body.year;

    this.albums.save(album);
    return {
      ...album,
      artistId: album.artist ? album.artist.id : null,
      artist: undefined,
    };
  }

  async delete(id: string) {
    await this.getUnique(id);
    await this.albums.delete({ id });
  }
}
