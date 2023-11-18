import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMovieRatingDto } from "./dto/create-movie-rating.dto";
import { UpdateMovieRatingDto } from "./dto/update-movie-rating.dto";
import { DatabaseService } from "@Src/database/database.service";

@Injectable()
export class MovieRatingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async ratingExist(userId: number, movieId: number) {
    const foundGenre = await this.databaseService.movieRating.findFirst({
      where: {
        createdById: userId,
        movieId: movieId,
      },
    });
    if (foundGenre)
      throw new ConflictException(
        `User with id ${userId} already gave rating to the movie with ID ${movieId}!`,
      );
  }

  async create(userId: number, createMovieRatingDto: CreateMovieRatingDto) {
    try {
      // ! prevent adding multiple ratings from same user for same movie
      await this.ratingExist(userId, createMovieRatingDto.movieId);
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
    } catch (error) {
      console.error("Error creating movie rating:", error);
      if (error instanceof HttpException) throw error;
      throw new Error("Failed to create movie rating.");
    }
  }

  async findAll() {
    try {
      return await this.databaseService.movieRating.findMany({});
    } catch (error) {
      console.error("Error fetching movie ratings:", error);
      throw new Error("Failed to fetch movie ratings.");
    }
  }

  async findOne(id: number) {
    try {
      return await this.databaseService.movieRating.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("Error fetching movie rating by ID:", error);
      throw new NotFoundException(`Movie rating with ID ${id} not found.`);
    }
  }

  async update(id: number, updateMovieRatingDto: UpdateMovieRatingDto) {
    try {
      return await this.databaseService.movieRating.update({
        where: { id },
        data: updateMovieRatingDto,
      });
    } catch (error) {
      console.error("Error updating movie rating:", error);
      throw new Error(`Failed to update movie rating with ID ${id}.`);
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.movieRating.delete({ where: { id } });
    } catch (error) {
      console.error("Error deleting movie rating:", error);
      throw new Error(`Failed to delete movie rating with ID ${id}.`);
    }
  }
}
