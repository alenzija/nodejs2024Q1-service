import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';
import { Album } from './entity/album.entity';

@ApiTags('Album controller')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library albums list',
  })
  @ApiResponse({
    status: 200,
    type: [Album],
    content: { 'application/json': {} },
  })
  async getAll(): Promise<Album[]> {
    return this.albumService.getAll();
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Gets single album by id',
  })
  @ApiResponse({
    status: 200,
    type: Album,
    content: { 'application/json': {} },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Album was not found',
  })
  async getUnique(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<Album> {
    return this.albumService.getUnique(uuid);
  }

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiBody({ type: AlbumDto, required: true })
  @ApiResponse({
    status: 201,
    type: Album,
    description: 'The album has been successfully created.',
    content: { 'application/json': {} },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "Body doesn't contain required fields",
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Artist was not found',
  })
  async create(
    @Body(new ValidationPipe())
    albumDto: AlbumDto,
  ) {
    return this.albumService.create(albumDto);
  }

  @Put(':uuid')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiResponse({
    status: 200,
    type: Album,
    description: 'The album has been successfully updated.',
    content: { 'application/json': {} },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Album was not found',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Artist was not found',
  })
  async update(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
    @Body(new ValidationPipe())
    albumDto: AlbumDto,
  ) {
    return this.albumService.update({ id: uuid, body: albumDto });
  }

  @Delete(':uuid')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'The album has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Album was not found',
  })
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return this.albumService.delete(uuid);
  }
}
