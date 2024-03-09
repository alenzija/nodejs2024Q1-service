import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { DbModule } from 'src/db/db.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [DbModule, TrackModule],
  providers: [AlbumService],
  controllers: [AlbumController],
  exports: [AlbumService],
})
export class AlbumModule {}
