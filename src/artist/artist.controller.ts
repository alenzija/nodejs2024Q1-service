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
import { ArtistService } from './artist.service';
import { Artist } from './interfaces/artist.interface';
import { ArtistDto } from './dto/artist.dto';

@ApiTags('Artist controller')
@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getAll(): Promise<Artist[]> {
    return this.artistService.getAll();
  }

  @Get(':uuid')
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
    description: 'The track has been successfully created.',
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
    description: 'The track has been successfully updated.',
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
    description: 'The track has been successfully deleted.',
  })
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return this.artistService.delete(uuid);
  }
}
