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
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { TrackService } from './track.service';

import { Track } from './entity/track.entity';
import { TrackDto } from './dto/track.dto';

@ApiTags('Track controller')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  @ApiOperation({
    summary: 'Get tracks list',
    description: 'Gets all library tracks list',
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    type: [Track],
    content: { 'application/json': {} },
  })
  async getAll(): Promise<Track[]> {
    return this.trackService.getAll();
  }

  @Get(':uuid')
  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Gets single track by id',
  })
  @ApiProduces('application/json')
  @ApiResponse({
    status: 200,
    description: 'Successful operation',
    type: Track,
    content: { 'application/json': {} },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Track was not found',
  })
  async getUnique(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<Track> {
    return this.trackService.getUnique(uuid);
  }

  @Post()
  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiBody({ type: TrackDto, required: true })
  @ApiResponse({
    status: 201,
    description: 'Successful operation',
    type: Track,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Artist or album was not found',
  })
  async create(
    @Body(new ValidationPipe())
    trackDto: TrackDto,
  ) {
    return this.trackService.create(trackDto);
  }

  @Put(':uuid')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiBody({ type: TrackDto, required: true })
  @ApiResponse({
    status: 200,
    description: 'The track has been successfully updated.',
    type: Track,
    content: { 'application/json': {} },
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'Track was not found',
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: 'Artist or album was not found',
  })
  async update(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
    @Body(new ValidationPipe())
    trackDto: TrackDto,
  ) {
    return this.trackService.update({ id: uuid, body: trackDto });
  }

  @Delete(':uuid')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete track from library',
  })
  @ApiResponse({
    status: 204,
    description: 'The track has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "There aren't any tracks with this id",
  })
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return this.trackService.delete(uuid);
  }
}
