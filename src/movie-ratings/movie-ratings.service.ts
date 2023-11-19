import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { CreateMovieRatingDto } from "./dto/create-movie-rating.dto";
import { UpdateMovieRatingDto } from "./dto/update-movie-rating.dto";
import { DatabaseService } from "@Src/database/database.service";

@Injectable()
export class MovieRatingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: number, createMovieRatingDto: CreateMovieRatingDto) {
    // ! prevent adding multiple ratings from same user for same movie
    await this.ratingExist(userId, createMovieRatingDto.movieId);
    // TODO handle if movie or user not found
    return await this.databaseService.movieRating.create({
      data: {
        score: createMovieRatingDto.score,
        movie: {
          connect: {
            id: createMovieRatingDto.movieId,
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
    return await this.databaseService.movieRating.findMany({});
  }

  async findOne(id: number) {
    return await this.databaseService.movieRating.findUnique({
      where: { id },
    });
  }

  // TODO Handle in update and delete if rating is not found to throw error for that

  async update(
    id: number,
    updateMovieRatingDto: UpdateMovieRatingDto,
    userId: number,
  ) {
    const foundRating = await this.databaseService.movieRating.findUnique({
      where: { id },
    });
    console.log(userId);
    if (foundRating.createdById !== userId)
      throw new ForbiddenException(
        "You do not have access to modify this rating",
      );
    return await this.databaseService.movieRating.update({
      where: { id },
      data: updateMovieRatingDto,
    });
  }

  async remove(id: number, userId: number) {
    const foundRating = await this.databaseService.movieRating.findUnique({
      where: { id },
    });
    console.log(userId);
    if (foundRating.createdById !== userId)
      throw new ForbiddenException(
        "You do not have access to modify this rating",
      );
    return await this.databaseService.movieRating.delete({ where: { id } });
  }

  async ratingExist(userId: number, movieId: number) {
    const foundMovieRating = await this.databaseService.movieRating.findFirst({
      where: {
        createdById: userId,
        movieId: movieId,
      },
    });
    if (foundMovieRating)
      throw new ConflictException(
        `User with id ${userId} already gave rating to the movie with ID ${movieId}!`,
      );
  }
}
