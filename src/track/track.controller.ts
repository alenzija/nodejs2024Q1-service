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
  ApiConsumes,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { TrackService } from './track.service';

import { Track } from './entity/track.entity';
import { TrackDto } from './dto/track.dto';
import { ErrorResponse } from 'src/entity/errorResponse.entity';

@ApiTags('Track controller')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [Track],
  })
  async getAll(): Promise<Track[]> {
    return this.trackService.getAll();
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    type: Track,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The track's id is not valid",
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The track with this id doesn't exist",
    type: ErrorResponse,
  })
  async getUnique(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<Track> {
    return this.trackService.getUnique(uuid);
  }

  @Post()
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 201,
    description: 'The track has been successfully created.',
    type: Track,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "Body doesn't contain required fields",
    type: ErrorResponse,
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: "There aren't any artists(albums) with this artistId(albumId)",
    type: ErrorResponse,
  })
  async create(
    @Body(new ValidationPipe())
    trackDto: TrackDto,
  ) {
    return this.trackService.create(trackDto);
  }

  @Put(':uuid')
  @HttpCode(200)
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 200,
    description: 'The track has been successfully updated.',
    type: Track,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The track's id is not valid",
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "There aren't any tracks with this id",
    type: ErrorResponse,
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: "There aren't any artists(albums) with this artistId(albumId)",
    type: ErrorResponse,
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
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 204,
    description: 'The track has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The track's id is not valid",
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "There aren't any tracks with this id",
    type: ErrorResponse,
  })
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return this.trackService.delete(uuid);
  }
}
