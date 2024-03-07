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
import { AlbumService } from './album.service';
import { Album } from './interface/album.interface';
import { AlbumDto } from './dto/album.dto';

@ApiTags('Album controller')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAll(): Promise<Album[]> {
    return this.albumService.getAll();
  }

  @Get(':uuid')
  async getUnique(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<Album> {
    return this.albumService.getUnique(uuid);
  }

  @Post()
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 201,
    description: 'The album has been successfully created.',
  })
  async create(
    @Body(new ValidationPipe())
    albumDto: AlbumDto,
  ) {
    return this.albumService.create(albumDto);
  }

  @Put(':uuid')
  @HttpCode(200)
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 200,
    description: 'The album has been successfully updated.',
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
  @ApiConsumes('application/json')
  @ApiResponse({
    status: 204,
    description: 'The album has been successfully deleted.',
  })
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return this.albumService.delete(uuid);
  }
}
