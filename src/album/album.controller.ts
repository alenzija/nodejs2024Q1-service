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
import { AlbumService } from './album.service';
import { Album } from './interface/album.interface';
import { AlbumDto } from './dto/album.dto';
import { AlbumResponseDto } from './dto/albumResponse.dto';
import { ErrorResponseDto } from 'src/dto/errorResponse.dto';

@ApiTags('Album controller')
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: [AlbumResponseDto],
  })
  async getAll(): Promise<Album[]> {
    return this.albumService.getAll();
  }

  @Get(':uuid')
  @ApiResponse({
    status: 200,
    type: AlbumResponseDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The album's id is not valid",
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "The album with this id doesn't exist",
    type: ErrorResponseDto,
  })
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
    type: AlbumResponseDto,
    description: 'The album has been successfully created.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "Body doesn't contain required fields",
    type: ErrorResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: "There aren't any artists with this artistId",
    type: ErrorResponseDto,
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
    type: AlbumResponseDto,
    description: 'The album has been successfully updated.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: "The albums's id is not valid",
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "There aren't any albums with this id",
    type: ErrorResponseDto,
  })
  @ApiUnprocessableEntityResponse({
    status: 422,
    description: "There aren't any artists with this artistId",
    type: ErrorResponseDto,
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
  @ApiBadRequestResponse({
    status: 400,
    description: "The albums's id is not valid",
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "There aren't any albums with this id",
    type: ErrorResponseDto,
  })
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' }))
    uuid: string,
  ): Promise<void> {
    return this.albumService.delete(uuid);
  }
}
