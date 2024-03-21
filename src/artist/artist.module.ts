import { Module, forwardRef } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DbModule } from 'src/db/db.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Artist } from './artist.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Artist]),
    forwardRef(() => DbModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  providers: [ArtistService],
  controllers: [ArtistController],
  exports: [ArtistService],
})
export class ArtistModule {}
