import { DatabaseService } from "@Src/database/database.service";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSeriesDto, UpdateSeriesDto } from "./dto";

@Injectable()
export class SeriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSeriesDto: CreateSeriesDto, userId: number) {
    await this.seriesExist(createSeriesDto.title);

    // TODO add to include actors and genres when creating (first create those modules)

    return await this.databaseService.series.create({
      data: {
        createdById: userId,
        ...createSeriesDto,
      },
    });
  }

  async findAll() {
    return await this.databaseService.series.findMany({});
  }

  async findOne(id: number, actors?: boolean, genres?: boolean) {
    const seriesActors = actors ? { select: { actor: actors } } : false;
    const seriesGenres = genres ? { select: { genre: genres } } : false;

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
