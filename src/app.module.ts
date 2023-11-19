import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";
import { MoviesModule } from "./movies/movies.module";
import { SeriesModule } from "./series/series.module";
import { GenresModule } from "./genres/genres.module";
import { ActorsModule } from "./actors/actors.module";
import { MovieActorModule } from "./movie-actor/movie-actor.module";
import { MovieGenreModule } from "./movie-genre/movie-genre.module";
import { GlobalExceptionFilter } from "./common/exceptions/global-exception.filter";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { AtGuard } from "./common/guards";
import { MovieRatingsModule } from "./movie-ratings/movie-ratings.module";
import { SeriesActorModule } from './series-actor/series-actor.module';
import { SeriesGenreModule } from './series-genre/series-genre.module';
import { SeriesRatingsModule } from './series-ratings/series-ratings.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    MoviesModule,
    SeriesModule,
    GenresModule,
    ActorsModule,
    MovieActorModule,
    MovieGenreModule,
    AuthModule,
    MovieRatingsModule,
    SeriesActorModule,
    SeriesGenreModule,
    SeriesRatingsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
