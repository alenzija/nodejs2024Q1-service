import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { TrackService } from 'src/track/track.service';

import { Favorites } from './entity/favorites.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private favorites: Repository<Favorites>,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
  ) {}

  async getOrCreateFavorite() {
    const favorites = await this.favorites.find({
      relations: [
        'artists',
        'albums',
        'albums.artist',
        'tracks',
        'tracks.artist',
        'tracks.album',
      ],
    });
    let favorite = favorites[0];
    if (!favorite) {
      favorite = new Favorites();
      await this.favorites.save(favorite);
    }
    favorite.albums = (favorite.albums || []).map((album) => ({
      ...album,
      artistId: album.artist ? album.artist.id : null,
      artist: undefined,
    }));
    favorite.tracks = (favorite.tracks || []).map((track) => ({
      ...track,
      artistId: track.artist ? track.artist.id : null,
      artist: undefined,
      albumId: track.album ? track.album.id : null,
      album: undefined,
    }));
    return favorite;
  }

  async getAll() {
    const favorite = await this.getOrCreateFavorite();
    return {
      tracks: favorite.tracks,
      artists: favorite.artists,
      albums: favorite.albums,
    };
  }

  hasTrackId(favorite: Favorites, id: string) {
    if (!favorite.tracks.some((track) => track.id === id)) {
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

  hasArtistId(favorite: Favorites, id: string) {
    if (!favorite.artists.some((artist) => artist.id === id)) {
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

  hasAlbumId(favorite: Favorites, id: string) {
    if (!favorite.albums.some((album) => album.id === id)) {
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

  async addTrack(id: string) {
    const track = await this.trackService.getUnique(id, {
      statusCode: 422,
      httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
    });
    const favorite = await this.getOrCreateFavorite();
    favorite.tracks = [...(favorite.tracks || []), track];

    await this.favorites.save(favorite);
  }

  async deleteTrack(id: string) {
    const favorite = await this.getOrCreateFavorite();
    this.hasTrackId(favorite, id);
    favorite.tracks = favorite.tracks.filter((track) => track.id !== id);

    await this.favorites.save(favorite);
  }

  async addAlbum(id: string) {
    const album = await this.albumService.getUnique(id, {
      statusCode: 422,
      httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
    });
    const favorite = await this.getOrCreateFavorite();
    favorite.albums = [...(favorite.albums || []), album];

    await this.favorites.save(favorite);
  }

  async deleteAlbum(id: string) {
    const favorite = await this.getOrCreateFavorite();
    this.hasAlbumId(favorite, id);
    favorite.albums = favorite.albums.filter((album) => album.id !== id);

    await this.favorites.save(favorite);
  }

  async addArtist(id: string) {
    const artist = await this.artistService.getUnique(id, {
      statusCode: 422,
      httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
    });
    const favorite = await this.getOrCreateFavorite();
    favorite.artists = [...(favorite.artists || []), artist];

    await this.favorites.save(favorite);
  }

  async deleteArtist(id: string) {
    const favorite = await this.getOrCreateFavorite();
    this.hasArtistId(favorite, id);
    favorite.artists = favorite.artists.filter((artist) => artist.id !== id);

    await this.favorites.save(favorite);
  }
}
