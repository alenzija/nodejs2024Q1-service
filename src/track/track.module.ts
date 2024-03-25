import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TrackService } from './track.service';
import { TrackController } from './track.controller';

import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { Track } from './entity/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track]),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
  ],
  providers: [TrackService],
  controllers: [TrackController],
  exports: [TrackService],
})
export class TrackModule {}
