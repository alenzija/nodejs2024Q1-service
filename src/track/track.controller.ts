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
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TrackService } from './track.service';

import { Track } from './interfaces/track.interface';
import { TrackDto } from './dto/track.dto';

@ApiTags('Track controller')
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getAll(): Promise<Track[]> {
    return this.trackService.getAll();
  }

  @Get(':uuid')
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
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return this.trackService.delete(uuid);
  }
}
