import { DatabaseService } from "@Src/database/database.service";
import { CreateGenreDto } from "@Src/genres/dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SeriesGenreService {
  constructor(private readonly databaseService: DatabaseService) {}

  async deleteAndCreateNewSeriesGenre(
    seriesId: number,
    genres: CreateGenreDto[],
  ) {
    await this.deleteSeriesGenres(seriesId);
    const seriesGenresCreateData =
      await this.createOrConnectGenresWithSeries(genres);

    await this.databaseService.series.update({
      where: { id: seriesId },
      data: {
        seriesGenres: { create: seriesGenresCreateData },
      },
    });
  }

  async createOrConnectGenresWithSeries(genres: CreateGenreDto[]) {
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

  async deleteSeriesGenres(seriesId: number) {
    await this.databaseService.seriesGenre.deleteMany({
      where: { seriesId },
    });
  }
}
