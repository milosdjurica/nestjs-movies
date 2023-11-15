import { Module } from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { MoviesController } from "./movies.controller";
import { MovieActorService } from "@Src/movie-actor/movie-actor.service";
import { MovieGenreService } from "@Src/movie-genre/movie-genre.service";

@Module({
  controllers: [MoviesController],
  providers: [MoviesService, MovieActorService, MovieGenreService],
})
export class MoviesModule {}
