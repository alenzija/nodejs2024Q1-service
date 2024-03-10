import { Module, forwardRef } from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

import { DbModule } from 'src/db/db.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';

@Module({
  imports: [
    forwardRef(() => DbModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => TrackModule),
  ],
  providers: [FavoritesService],
  controllers: [FavoritesController],
})
export class FavoritesModule {}
