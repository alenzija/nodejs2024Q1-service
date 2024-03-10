import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './interfaces/favoritesResponse.interface';
import { FavoritesResponseDto } from './dto/favoritesResponse.dto';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';

@ApiTags('Favorites controller')
@Controller('favs')
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [FavoritesResponseDto],
  })
  async getAll(): Promise<FavoritesResponse> {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  @ApiConsumes('application/json')
  @ApiCreatedResponse({
    status: 201,
    description: 'The track has been successfully added.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "This id isn't valid",
    type: ErrorResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: "There aren't any tracks with this id",
    type: ErrorResponseDto,
  })
  async addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 204,
    description: 'The track has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The track's id is not valid",
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "There aren't any favorite tracks with this id",
    type: ErrorResponseDto,
  })
  async deleteTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.deleteTrack(id);
  }

  @Post('artist/:id')
  @ApiConsumes('application/json')
  @ApiCreatedResponse({
    status: 201,
    description: 'The artist has been successfully added.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "This id isn't valid",
    type: ErrorResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: "There aren't any artists with this id",
    type: ErrorResponseDto,
  })
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 204,
    description: 'The artist has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The artist's id is not valid",
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "There aren't any favorite artists with this id",
    type: ErrorResponseDto,
  })
  async deleteArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.deleteArtist(id);
  }

  @Post('album/:id')
  @ApiConsumes('application/json')
  @ApiCreatedResponse({
    status: 201,
    description: 'The album has been successfully added.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "This id isn't valid",
    type: ErrorResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: "There aren't any albums with this id",
    type: ErrorResponseDto,
  })
  async addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 204,
    description: 'The album has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The album's id is not valid",
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "There aren't any favorite albums with this id",
    type: ErrorResponseDto,
  })
  async deleteAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return this.favoritesService.deleteAlbum(id);
  }
}
