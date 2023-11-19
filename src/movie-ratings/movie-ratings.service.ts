import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
  Injectable,
} from "@nestjs/common";
import { CreateMovieRatingDto } from "./dto/create-movie-rating.dto";
import { UpdateMovieRatingDto } from "./dto/update-movie-rating.dto";
import { DatabaseService } from "@Src/database/database.service";

@Injectable()
export class MovieRatingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: number, createMovieRatingDto: CreateMovieRatingDto) {
    // ! this is preventing same user to add multiple ratings for one movie
    await this.ratingExist(userId, createMovieRatingDto.movieId);

    const movieExist = await this.databaseService.movie.findUnique({
      where: { id: createMovieRatingDto.movieId },
    });
    if (!movieExist)
      throw new NotFoundException(
        `Movie with id ${createMovieRatingDto.movieId} does not exist! Please provide another movie ID`,
      );

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
    const rating = await this.databaseService.movieRating.findUnique({
      where: { id },
    });
    if (!rating)
      throw new NotFoundException(`Could not find rating with id ${id}!`);
    return rating;
  }

  async update(
    id: number,
    updateMovieRatingDto: UpdateMovieRatingDto,
    userId: number,
  ) {
    const foundRating = await this.findOne(id);

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
    const foundRating = await this.findOne(id);
    if (foundRating.createdById !== userId)
      throw new ForbiddenException(
        "You do not have access to modify this rating",
      );
    return await this.databaseService.movieRating.delete({ where: { id } });
  }

  // ! Here is problem bcz if i delete rating from database, it still process it like it is there
  // ! So it wont be found in this method and wont drop error, but still wont be able to add rating again
  // TODO FIX THIS !!!!!!
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

  // async findAvgRatingForMovie(movieId: number) {
  //   const ratings = await this.databaseService.movieRating.findMany({
  //     where: { movieId },
  //   });

  //   // ! Movie does not have any ratings
  //   if (ratings.length === 0) {
  //     return null;
  //   }

  //   const totalScore = ratings.reduce(
  //     (sum, rating) => (sum += rating.score),
  //     0,
  //   );
  //   return totalScore / ratings.length;
  // }
}
