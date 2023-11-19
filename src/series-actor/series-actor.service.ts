import { CreateActorDto } from "@Src/actors/dto";
import { DatabaseService } from "@Src/database/database.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SeriesActorService {
  constructor(private readonly databaseService: DatabaseService) {}

  async deleteAndCreateNewSeriesActor(
    seriesId: number,
    actors: CreateActorDto[],
  ) {
    await this.deleteSeriesActors(seriesId);
    const seriesActorsCreateData =
      await this.createOrConnectActorsWithSeries(actors);

    await this.databaseService.series.update({
      where: { id: seriesId },
      data: {
        seriesActors: { create: seriesActorsCreateData },
      },
    });
  }

  async createOrConnectActorsWithSeries(actors: CreateActorDto[]) {
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

  async deleteSeriesActors(seriesId: number) {
    await this.databaseService.seriesActor.deleteMany({
      where: { seriesId },
    });
  }
}
