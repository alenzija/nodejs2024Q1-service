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
} from '@nestjs/swagger';

import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';
import { Artist } from './entity/artist.entity';

import { ErrorResponse } from 'src/entity/errorResponse.entity';

@ApiTags('Artist controller')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [Artist],
  })
  async getAll(): Promise<Artist[]> {
    return this.artistService.getAll();
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    type: Artist,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The artist's id is not valid",
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The artist with this id doesn't exist",
    type: ErrorResponse,
  })
  async getUnique(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<Artist> {
    return this.artistService.getUnique(uuid);
  }

  @Post()
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 201,
    description: 'The artist has been successfully created.',
    type: Artist,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "Body doesn't contain required fields",
    type: ErrorResponse,
  })
  async create(
    @Body(new ValidationPipe())
    artistDto: ArtistDto,
  ) {
    return this.artistService.create(artistDto);
  }

  @Put(':uuid')
  @HttpCode(200)
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 200,
    description: 'The artist has been successfully updated.',
    type: Artist,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The artist's id is not valid",
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The artist with this id doesn't exist",
    type: ErrorResponse,
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
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 204,
    description: 'The artist has been successfully deleted.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The artist's id is not valid",
    type: ErrorResponse,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The artist with this id doesn't exist",
    type: ErrorResponse,
  })
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return this.artistService.delete(uuid);
  }
}
