import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from "@nestjs/common";
import { CreateSeriesRatingDto } from "./dto/create-series-rating.dto";
import { UpdateSeriesRatingDto } from "./dto/update-series-rating.dto";
import { DatabaseService } from "@Src/database/database.service";

@Injectable()
export class SeriesRatingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: number, createSeriesRatingDto: CreateSeriesRatingDto) {
    await this.ratingExist(userId, createSeriesRatingDto.seriesId);

    const seriesExist = await this.databaseService.series.findUnique({
      where: { id: createSeriesRatingDto.seriesId },
    });
    if (!seriesExist)
      throw new NotFoundException(
        `Series with id ${createSeriesRatingDto.seriesId} does not exist! Please provide another series ID`,
      );

    return await this.databaseService.seriesRating.create({
      data: {
        score: createSeriesRatingDto.score,
        series: {
          connect: {
            id: createSeriesRatingDto.seriesId,
          },
        },
        createdBy: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async findAll() {
    return await this.databaseService.seriesRating.findMany({});
  }

  async findOne(id: number) {
    const rating = await this.databaseService.seriesRating.findUnique({
      where: { id },
    });
    if (!rating)
      throw new NotFoundException(`Could not find rating with id ${id}!`);
    return rating;
  }

  async update(
    id: number,
    updateSeriesRatingDto: UpdateSeriesRatingDto,
    userId: number,
  ) {
    const foundRating = await this.findOne(id);

    if (foundRating.createdById !== userId)
      throw new ForbiddenException(
        "You do not have access to modify this rating",
      );
    return await this.databaseService.seriesRating.update({
      where: { id },
      data: updateSeriesRatingDto,
    });
  }

  async remove(id: number, userId: number) {
    const foundRating = await this.findOne(id);
    if (foundRating.createdById !== userId)
      throw new ForbiddenException(
        "You do not have access to modify this rating",
      );
    return await this.databaseService.seriesRating.delete({ where: { id } });
  }

  async ratingExist(userId: number, seriesId: number) {
    const foundSeriesRating = await this.databaseService.seriesRating.findFirst(
      {
        where: {
          createdById: userId,
          seriesId,
        },
      },
    );
    console.group(foundSeriesRating);
    if (foundSeriesRating)
      throw new ConflictException(
        `User with id ${userId} already gave rating to the series with ID ${seriesId}!`,
      );
  }
}
