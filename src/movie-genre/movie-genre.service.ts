import { DatabaseService } from "@Src/database/database.service";
import { CreateGenreDto } from "@Src/genres/dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MovieGenreService {
  constructor(private readonly databaseService: DatabaseService) {}

  async deleteAndCreateNewMoviesGenre(
    movieId: number,
    genres: CreateGenreDto[],
  ) {
    await this.deleteMovieGenres(movieId);
    const movieGenresCreateData =
      await this.createOrConnectGenresWithMovies(genres);

    await this.databaseService.movie.update({
      where: { id: movieId },
      data: {
        movieGenres: { create: movieGenresCreateData },
      },
    });
  }

  async createOrConnectGenresWithMovies(genres: CreateGenreDto[]) {
    return Promise.all(
      genres.map(async (genre) => {
        const createdGenre = await this.databaseService.genre.upsert({
          where: { name: genre.name },
          update: {},
          create: genre,
        });
        return { genre: { connect: { id: createdGenre.id } } };
      }),
    );
  }

  async deleteMovieGenres(movieId: number) {
    await this.databaseService.movieGenre.deleteMany({
      where: { movieId },
    });
  }
}
