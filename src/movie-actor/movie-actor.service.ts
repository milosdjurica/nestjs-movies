import { CreateActorDto } from "@Src/actors/dto";
import { DatabaseService } from "@Src/database/database.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MovieActorService {
  constructor(private readonly databaseService: DatabaseService) {}

  async deleteAndCreateNewMoviesActor(
    movieId: number,
    actors: CreateActorDto[],
  ) {
    await this.deleteMovieActors(movieId);
    const movieActorsCreateData =
      await this.createOrConnectActorsWithMovies(actors);

    await this.databaseService.movie.update({
      where: { id: movieId },
      data: {
        movieActors: { create: movieActorsCreateData },
      },
    });
  }

  async createOrConnectActorsWithMovies(actors: CreateActorDto[]) {
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

  async deleteMovieActors(movieId: number) {
    // Assuming your Prisma model is named MovieActor
    await this.databaseService.movieActor.deleteMany({
      where: {
        movieId,
      },
    });
  }
}
