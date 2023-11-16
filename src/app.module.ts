import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { UsersModule } from "./users/users.module";
import { MoviesModule } from "./movies/movies.module";
import { SeriesModule } from "./series/series.module";
import { GenresModule } from "./genres/genres.module";
import { RatingsModule } from "./ratings/ratings.module";
import { ActorsModule } from "./actors/actors.module";
import { MovieActorModule } from "./movie-actor/movie-actor.module";
import { MovieGenreModule } from "./movie-genre/movie-genre.module";
import { GlobalExceptionFilter } from "./exceptions/global-exception.filter";
import { APP_FILTER } from "@nestjs/core";

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    MoviesModule,
    SeriesModule,
    GenresModule,
    RatingsModule,
    ActorsModule,
    MovieActorModule,
    MovieGenreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
