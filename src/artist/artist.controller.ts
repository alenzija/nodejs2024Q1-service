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
import { Artist } from './interfaces/artist.interface';
import { ArtistDto } from './dto/artist.dto';
import { ArtistResponseDto } from './dto/artistResponse.dto';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';

@ApiTags('Artist controller')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [ArtistResponseDto],
  })
  async getAll(): Promise<Artist[]> {
    return this.artistService.getAll();
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    type: ArtistResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The artist's id is not valid",
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The artist with this id doesn't exist",
    type: ErrorResponseDto,
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
    type: ArtistResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "Body doesn't contain required fields",
    type: ErrorResponseDto,
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
    type: ArtistResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The artist's id is not valid",
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The artist with this id doesn't exist",
    type: ErrorResponseDto,
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
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The artist with this id doesn't exist",
    type: ErrorResponseDto,
  })
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return this.artistService.delete(uuid);
  }
}
