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

  // ! Create
  async create(createMovieDto: CreateMovieDto, userId: number) {
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
          createdById: userId,
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

  // ! Find ALL
  async findAll(
    page: number,
    perPage: number,
    minRating?: number,
    maxRating?: number,
    includeActors?: boolean,
    includeGenres?: boolean,
    actorNames?: string,
    genreNames?: string,
  ) {
    try {
      const actorsArr = actorNames?.split(",");
      const genresArr = genreNames?.split(",");

      // ! Helpers for prisma query, extracted them for cleaner code
      const movieActors = includeActors
        ? { select: { actor: includeActors } }
        : false;

      const movieGenres = includeGenres
        ? { select: { genre: includeGenres } }
        : false;

      const actorQuery = { some: { actor: { name: { in: actorsArr } } } };
      const genreQuery = { some: { genre: { name: { in: genresArr } } } };

      // TODO Add movieRatings query i include movieRatings
      const movies = await this.databaseService.movie.findMany({
        where: { movieActors: actorQuery, movieGenres: genreQuery },
        skip: (page - 1) * perPage,
        take: perPage,
        include: { movieActors, movieGenres },
      });

      return { length: movies.length, movies };
    } catch (error) {
      console.error(`Could not find any movies!`, error.message);
      throw new HttpException(
        `Could not find any movies!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ! Find By ID
  async findOne(id: number, actors?: boolean, genres?: boolean) {
    try {
      const movieActors = actors ? { select: { actor: actors } } : false;
      const movieGenres = genres ? { select: { genre: genres } } : false;

      const movie = await this.databaseService.movie.findUnique({
        where: { id },
        include: { movieActors, movieGenres },
      });

      if (!movie)
        throw new NotFoundException(`Could not find a movie with ID ${id}`);
      return movie;
    } catch (error) {
      console.error(`Could not find a movie with ID ${id}.`);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Could not find a movie with ID ${id}. Check if that item already exist.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ! Update Movie and its MovieActor and MovieGenre relationships
  async update(id: number, updateMovieDto: UpdateMovieDto) {
    try {
      await this.findOne(id);
      if (updateMovieDto.title) await this.movieExist(updateMovieDto.title);

      // ! Delete existing movies-actors relationship and create new ones
      if (updateMovieDto.actors !== undefined) {
        await this.moviesActorsService.deleteAndCreateNewMoviesActor(
          id,
          updateMovieDto.actors,
        );
      }

      // ! Delete existing movies-genres relationship and create new ones
      if (updateMovieDto.genres !== undefined) {
        await this.moviesGenreService.deleteAndCreateNewMoviesGenre(
          id,
          updateMovieDto.genres,
        );
      }

      // ! Delete so i can just send object down,
      // ! because movie doesnt have actors and genres field, it only has movieActors field...
      delete updateMovieDto.actors;
      delete updateMovieDto.genres;

      return await this.databaseService.movie.update({
        where: { id },
        data: updateMovieDto,
      });
    } catch (error) {
      console.error(`Error updating movie with ID ${id}:`, error.message);
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        `Error updating movie with ID ${id}!`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ! Delete Movie
  async remove(id: number) {
    try {
      return await this.databaseService.movie.delete({ where: { id } });
    } catch (error) {
      console.error(`Error deleting movie with ID ${id}:`, error.message);
      throw new HttpException(
        `Error deleting movie with ID ${id}! Check if that item already exist.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async movieExist(title: string) {
    const movie = await this.databaseService.movie.findUnique({
      where: { title },
    });

    if (movie)
      throw new ConflictException(
        `Movie with title ${title} already exist! Please provide another title`,
      );
  }
}
