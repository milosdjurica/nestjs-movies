import { DatabaseService } from "@Src/database/database.service";
import { ConflictException, HttpException, Injectable } from "@nestjs/common";
import { CreateActorDto, UpdateActorDto } from "./dto";

@Injectable()
export class ActorsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createActorDto: CreateActorDto) {
    try {
      await this.actorExist(createActorDto.name);

      return await this.databaseService.actor.create({ data: createActorDto });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      console.error(`Error with creating an actor: `, error);
      throw new Error("An error occurred while creating the actor.");
    }
  }

  async findAll() {
    try {
      return await this.databaseService.actor.findMany({});
    } catch (error) {
      console.error(`Error trying to find actors:`, error);
      throw new Error(
        "An error occurred while trying to find all actors actor.",
      );
    }
  }

  async findOne(id: number) {
    try {
      return await this.databaseService.actor.findUnique({ where: { id } });
    } catch (error) {
      console.error(`Error trying to find actor with ID ${id}:`, error);
      throw new Error("An error occurred while trying to find the actor.");
    }
  }

  async update(id: number, updateActorDto: UpdateActorDto) {
    try {
      await this.actorExist(updateActorDto.name);

      return await this.databaseService.actor.update({
        where: { id },
        data: updateActorDto,
      });
    } catch (error) {
      console.error(`Error updating actor with ID ${id}:`, error);
      if (error instanceof HttpException) throw error;
      throw new Error("An error occurred while updating the actor.");
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.actor.delete({ where: { id } });
    } catch (error) {
      console.error(`Error deleting actor with ID ${id}:`, error);
      throw new Error("An error occurred while deleting the actor.");
    }
  }

  async actorExist(name: string) {
    const foundActor = await this.databaseService.actor.findUnique({
      where: { name },
    });
    if (foundActor)
      throw new ConflictException(
        `Actor with name ${name} already exist! Please provide another name`,
      );
  }
}
