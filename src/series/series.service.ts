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
    includeRatings?: boolean,
    actorNames?: string,
    genreNames?: string,
    minNumOfEpisodes?: number,
    maxNumOfEpisodes?: number,
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

    const episodesQuery: { numOfEpisodes?: { gte?: number; lte?: number } } =
      {};

    if (minNumOfEpisodes !== undefined) {
      episodesQuery.numOfEpisodes = { gte: minNumOfEpisodes };
    }

    if (maxNumOfEpisodes !== undefined) {
      episodesQuery.numOfEpisodes = {
        ...(episodesQuery.numOfEpisodes || {}),
        lte: maxNumOfEpisodes,
      };
    }

    return await this.databaseService.series.findMany({
      where: {
        seriesActors: actorQuery,
        seriesGenres: genreQuery,
        ...episodesQuery,
      },
      skip: (page - 1) * perPage,
      take: perPage,
      include: { seriesActors, seriesGenres, ratings: includeRatings },
    });
  }

  async findOne(
    id: number,
    includeActors?: boolean,
    includeGenres?: boolean,
    includeRatings?: boolean,
  ) {
    const seriesActors = includeActors
      ? { select: { actor: includeActors } }
      : false;
    const seriesGenres = includeGenres
      ? { select: { genre: includeGenres } }
      : false;

    const series = await this.databaseService.series.findUnique({
      where: { id },
      include: { seriesActors, seriesGenres, ratings: includeRatings },
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
