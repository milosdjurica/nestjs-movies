import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { SeriesModule } from './series/series.module';
import { GenresModule } from './genres/genres.module';
import { ActorModule } from './actor/actor.module';
import { RatingsModule } from './ratings/ratings.module';

@Module({
  imports: [DatabaseModule, UsersModule, MoviesModule, SeriesModule, GenresModule, ActorModule, RatingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
