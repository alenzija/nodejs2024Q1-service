import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TrackModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { DbService } from './db/db.service';
import { DbModule } from './db/db.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    UserModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    DbModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
