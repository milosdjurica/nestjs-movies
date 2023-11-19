import { DatabaseService } from "@Src/database/database.service";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSeriesDto, UpdateSeriesDto } from "./dto";
import { SeriesActorService } from "@Src/series-actor/series-actor.service";
import { SeriesGenreService } from "@Src/series-genre/series-genre.service";

@Injectable()
export class SeriesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly seriesActorService: SeriesActorService,
    private readonly seriesGenreService: SeriesGenreService,
  ) {}

  async create(createSeriesDto: CreateSeriesDto, userId: number) {
    await this.seriesExist(createSeriesDto.title);

    // TODO add to include actors and genres when creating (first create those modules)

    const seriesActorsCreateData =
      await this.seriesActorService.createOrConnectActorsWithSeries(
        createSeriesDto.actors || [],
      );
    const seriesGenresCreateData =
      await this.seriesGenreService.createOrConnectGenresWithSeries(
        createSeriesDto.genres || [],
      );

    delete createSeriesDto.actors;
    delete createSeriesDto.genres;

    return await this.databaseService.series.create({
      data: {
        createdById: userId,
        ...createSeriesDto,
        seriesActors: { create: seriesActorsCreateData },
        seriesGenres: { create: seriesGenresCreateData },
      },
    });
  }

  async findAll(
    page: number,
    perPage: number,
    includeActors?: boolean,
    includeGenres?: boolean,
    actorNames?: string,
    genreNames?: string,
  ) {
    const actorsArr = actorNames?.split(",");
    const genresArr = genreNames?.split(",");

    const seriesActors = includeActors ? { select: { actor: true } } : false;

    const seriesGenres = includeGenres ? { select: { genre: true } } : false;

    const actorQuery = actorsArr
      ? { some: { actor: { name: { in: actorsArr } } } }
      : {};

    const genreQuery = genresArr
      ? { some: { genre: { name: { in: genresArr } } } }
      : {};

    return await this.databaseService.series.findMany({
      where: { seriesActors: actorQuery, seriesGenres: genreQuery },
      skip: (page - 1) * perPage,
      take: perPage,
      include: { seriesActors, seriesGenres },
    });
  }

  async findOne(id: number, includeActors?: boolean, includeGenres?: boolean) {
    const seriesActors = includeActors
      ? { select: { actor: includeActors } }
      : false;
    const seriesGenres = includeGenres
      ? { select: { genre: includeGenres } }
      : false;

    const series = await this.databaseService.series.findUnique({
      where: { id },
      include: { seriesActors, seriesGenres },
    });

    if (!series)
      throw new NotFoundException(`Could not find a series with ID ${id}`);
    return series;
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto) {
    return await this.databaseService.series.update({
      where: { id },
      data: updateSeriesDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.databaseService.series.delete({ where: { id } });
  }

  async seriesExist(title: string) {
    const series = await this.databaseService.series.findUnique({
      where: { title },
    });
    if (series)
      throw new ConflictException(
        `Series with title ${title} already exist! Please provide another title`,
      );
  }
}
