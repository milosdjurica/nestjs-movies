import {
  Injectable,
  NotFoundException,
  ConflictException,
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
        `series with id ${createSeriesRatingDto.seriesId} does not exist! Please provide another movie ID`,
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
    return `This action returns all seriesRatings`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} seriesRating`;
  }

  async update(
    id: number,
    updateSeriesRatingDto: UpdateSeriesRatingDto,
    userId: number,
  ) {
    return `This action updates a #${id} seriesRating`;
  }

  async remove(id: number, userId: number) {
    return `This action removes a #${id} seriesRating`;
  }

  async ratingExist(userId: number, movieId: number) {
    const foundMovieRating = await this.databaseService.movieRating.findFirst({
      where: {
        createdById: userId,
        movieId,
      },
    });
    console.group(foundMovieRating);
    if (foundMovieRating)
      throw new ConflictException(
        `User with id ${userId} already gave rating to the movie with ID ${movieId}!`,
      );
  }
}
