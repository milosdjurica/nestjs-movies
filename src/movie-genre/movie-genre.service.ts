import { DatabaseService } from "@Src/database/database.service";
import { CreateGenreDto } from "@Src/genres/dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MovieGenreService {
  constructor(private readonly databaseService: DatabaseService) {}

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
}
