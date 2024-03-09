import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './interfaces/favoritesResponse.interface';

@ApiTags('Favorites controller')
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  async getAll(): Promise<FavoritesResponse> {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  async addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.deleteArtist(id);
  }

  @Post('album/:id')
  async addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.deleteAlbum(id);
  }
}
