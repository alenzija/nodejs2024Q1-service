import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { DbService } from 'src/db/db.service';
import { TrackService } from 'src/track/track.service';
import { FavoritesResponse } from './entity/favoritesResponse.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => DbService))
    private db: DbService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
  ) {}

  getAll(): FavoritesResponse {
    return {
      artists: this.db.favorites.artists.map((artistId) =>
        this.artistService.getUnique(artistId),
      ),
      albums: this.db.favorites.albums.map((albumId) =>
        this.albumService.getUnique(albumId),
      ),
      tracks: this.db.favorites.tracks.map((trackId) =>
        this.trackService.getUnique(trackId),
      ),
    };
  }

  hasTrackId(id: string) {
    if (!this.db.favorites.tracks.includes(id)) {
      throw new HttpException(
        {
          statusCode: 422,
          message: "Track with this id isn't favorite",
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return true;
  }

  hasArtistId(id: string) {
    if (!this.db.favorites.artists.includes(id)) {
      throw new HttpException(
        {
          statusCode: 422,
          message: "Artist with this id isn't favorite",
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return true;
  }

  hasAlbumId(id: string) {
    if (!this.db.favorites.albums.includes(id)) {
      throw new HttpException(
        {
          statusCode: 422,
          message: "Album with this id isn't favorite",
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return true;
  }

  addTrack(id: string): void {
    this.trackService.getUnique(id, {
      statusCode: 422,
      httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
    });
    this.db.favorites.tracks.push(id);
  }

  deleteTrack(id: string): void {
    this.hasTrackId(id);
    this.db.favorites.tracks = this.db.favorites.tracks.filter(
      (trackId) => trackId !== id,
    );
  }

  addAlbum(id: string): void {
    this.albumService.getUnique(id, {
      statusCode: 422,
      httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
    });
    this.db.favorites.albums.push(id);
  }

  deleteAlbum(id: string): void {
    this.hasAlbumId(id);
    this.db.favorites.albums = this.db.favorites.albums.filter(
      (albumId) => albumId !== id,
    );
  }

  addArtist(id: string): void {
    this.artistService.getUnique(id, {
      statusCode: 422,
      httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
    });
    this.db.favorites.artists.push(id);
  }

  deleteArtist(id: string): void {
    this.hasArtistId(id);
    this.db.favorites.artists = this.db.favorites.artists.filter(
      (artistId) => artistId !== id,
    );
  }
}
