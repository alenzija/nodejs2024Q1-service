import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DbModule } from 'src/db/db.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [DbModule, AlbumModule, TrackModule],
  providers: [ArtistService],
  controllers: [ArtistController],
  exports: [ArtistService],
})
export class ArtistModule {}
