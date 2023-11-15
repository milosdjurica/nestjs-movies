import { DatabaseService } from "@Src/database/database.service";
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMovieDto, UpdateMovieDto } from "./dto";
import { MovieActorService } from "@Src/movie-actor/movie-actor.service";
import { MovieGenreService } from "@Src/movie-genre/movie-genre.service";

@Injectable()
export class MoviesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly moviesActorsService: MovieActorService,
    private readonly moviesGenreService: MovieGenreService,
  ) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      // ! If exist then this will throw an error
      await this.movieExist(createMovieDto.title);

      // ! If no actors then pass empty array
      const movieActorsCreateData =
        await this.moviesActorsService.createOrConnectActorsWithMovies(
          createMovieDto.actors || [],
        );
      const movieGenresCreateData =
        await this.moviesGenreService.createOrConnectGenresWithMovies(
          createMovieDto.genres || [],
        );

      // ! Delete those properties so i can just spread object in create method
      // ! instead of manually adding every field
      delete createMovieDto.actors;
      delete createMovieDto.genres;

      return await this.databaseService.movie.create({
        data: {
          ...createMovieDto,
          movieActors: { create: movieActorsCreateData },
          movieGenres: { create: movieGenresCreateData },
        },
      });
    } catch (error) {
      console.error(`Error creating movie: ${error.message}`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Error creating movie: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll() {
    try {
      return await this.databaseService.movie.findMany({});
    } catch (error) {
      console.error(`Could not find any movies!`, error.message);
      throw new HttpException(
        `Could not find any movies!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const movie = await this.databaseService.movie.findUnique({
        where: { id },
      });

      if (!movie)
        throw new NotFoundException(`Could not find a movie with ID ${id}`);
      return movie;
    } catch (error) {
      console.error(`Could not find a movie with ID ${id}:`, error.message);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Could not find a movie with ID ${id}. Check if that item already exist.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    try {
      return await this.databaseService.movie.update({
        where: {
          id,
        },
        data: updateMovieDto,
      });
    } catch (error) {
      console.error(`Error updating movie with ID ${id}:`, error.message);
      throw new HttpException(
        `Error updating movie with ID ${id}!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.movie.delete({ where: { id } });
    } catch (error) {
      console.error(`Error deleting movie with ID ${id}:`, error.message);
      throw new HttpException(
        `Error creating movie with ID ${id}! Check if that item already exist.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // TODO Maybe i should move this to ActorsService and GenresService
  // TODO ???????????????????????????????????????????????????????????

  async movieExist(title: string) {
    const movie = await this.databaseService.movie.findUnique({
      where: { title },
    });

    if (movie)
      throw new ConflictException(`Movie with title ${title} already exist!`);
  }
}
