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
} from '@nestjs/swagger';

import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import { Artist } from './entity/artist.entity';

@ApiTags('Artist controller')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all artists',
    description: 'Gets all artists',
  })
  @ApiResponse({
    status: 200,
    type: [Artist],
  })
  async getAll(): Promise<Artist[]> {
    return this.artistService.getAll();
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Get single artist by id',
    description: 'Gets single artist by id',
  })
  @ApiResponse({
    status: 200,
    type: Artist,
    content: { 'application/json': {} },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Artist was not found',
  })
  async getUnique(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<Artist> {
    return this.artistService.getUnique(uuid);
  }

  @Post()
  @ApiOperation({
    summary: 'Add new artist',
    description: 'Add new artist',
  })
  @ApiBody({ type: ArtistDto, required: true })
  @ApiResponse({
    status: 201,
    description: 'The artist has been successfully created.',
    type: Artist,
    content: { 'application/json': {} },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "Body doesn't contain required fields",
  })
  async create(
    @Body(new ValidationPipe())
    artistDto: ArtistDto,
  ) {
    return this.artistService.create(artistDto);
  }

  @Put(':uuid')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update artist information',
    description: 'Update artist information by UUID',
  })
  @ApiBody({ type: ArtistDto, required: true })
  @ApiResponse({
    status: 200,
    description: 'The artist has been successfully updated.',
    type: Artist,
    content: { 'application/json': {} },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Artist was not found',
  })
  async update(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
    @Body(new ValidationPipe())
    artistDto: ArtistDto,
  ) {
    return this.artistService.update({ id: uuid, body: artistDto });
  }

  @Delete(':uuid')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete artist',
    description: 'Delete artist from library',
  })
  @ApiResponse({
    status: 204,
    description: 'The artist has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Artist was not found',
  })
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return this.artistService.delete(uuid);
  }
}
