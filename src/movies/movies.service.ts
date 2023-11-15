import { DatabaseService } from "@Src/database/database.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMovieDto, UpdateMovieDto } from "./dto";
import { CreateGenreDto } from "@Src/genres/dto";
import { CreateActorDto } from "@Src/actors/dto";

@Injectable()
export class MoviesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      // TODO Add check if movie already exist with that name or change to upsert ???

      // ! If no actors then pass empty array
      const actors = createMovieDto.actors || [];
      const genres = createMovieDto.genres || [];
      // ! Delete those properties so i can just spread object in create method
      // ! instead of manually adding every field
      delete createMovieDto.actors;
      delete createMovieDto.genres;

      const movieActorsCreateData =
        await this.createOrConnectActorsWithMovies(actors);

      const movieGenresCreateData =
        await this.createOrConnectGenresWithMovies(genres);

      return await this.databaseService.movie.create({
        data: {
          ...createMovieDto,
          movieActors: {
            create: movieActorsCreateData,
          },
          movieGenres: {
            create: movieGenresCreateData,
          },
        },
      });
    } catch (error) {
      console.error("Error creating movie:", error);
      throw new Error("Failed to create movie.");
    }
  }

  async findAll() {
    try {
      return await this.databaseService.movie.findMany({});
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw new Error("Failed to fetch movies.");
    }
  }

  async findOne(id: number) {
    try {
      const movie = await this.databaseService.movie.findUnique({
        where: { id },
      });
      if (!movie) {
        throw new NotFoundException(`Movie with ID ${id} not found.`);
      }
      return movie;
    } catch (error) {
      console.error(`Error fetching movie with ID ${id}:`, error);
      throw new Error("Failed to fetch movie.");
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
      console.error(`Error updating movie with ID ${id}:`, error);
      throw new Error("Failed to update movie.");
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.movie.delete({ where: { id } });
    } catch (error) {
      console.error(`Error deleting movie with ID ${id}:`, error);
      throw new Error("Failed to delete movie.");
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
}
