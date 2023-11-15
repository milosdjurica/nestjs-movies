import { DatabaseService } from "@Src/database/database.service";
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateMovieDto, UpdateMovieDto } from "./dto";
import { CreateGenreDto } from "@Src/genres/dto";
import { CreateActorDto } from "@Src/actors/dto";

@Injectable()
export class MoviesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      // ! If exist then this will throw an error
      await this.movieExist(createMovieDto.title);

      // ! If no actors then pass empty array
      const movieActorsCreateData = await this.createOrConnectActorsWithMovies(
        createMovieDto.actors || [],
      );
      const movieGenresCreateData = await this.createOrConnectGenresWithMovies(
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
  private async createOrConnectActorsWithMovies(actors: CreateActorDto[]) {
    return Promise.all(
      actors.map(async (actor) => {
        const createdActor = await this.databaseService.actor.upsert({
          where: { name: actor.name },
          update: {},
          create: actor,
        });
        return { actor: { connect: { id: createdActor.id } } };
      }),
    );
  }

  private async createOrConnectGenresWithMovies(genres: CreateGenreDto[]) {
    return Promise.all(
      genres.map(async (genre) => {
        const createdGenre = await this.databaseService.genre.upsert({
          where: { name: genre.name },
          update: {},
          create: genre,
        });
        return { genre: { connect: { id: createdGenre.id } } };
      }),
    );
  }

  async movieExist(title: string) {
    const movie = await this.databaseService.movie.findUnique({
      where: { title },
    });

    if (movie)
      throw new ConflictException(`Movie with title ${title} already exist!`);
  }
}
