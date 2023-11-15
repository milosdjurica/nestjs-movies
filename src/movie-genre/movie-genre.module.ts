import { Module } from "@nestjs/common";
import { MovieGenreService } from "./movie-genre.service";

@Module({
  providers: [MovieGenreService],
})
export class MovieGenreModule {}
