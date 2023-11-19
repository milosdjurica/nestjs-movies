import { DatabaseService } from "@Src/database/database.service";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateActorDto, UpdateActorDto } from "./dto";

@Injectable()
export class ActorsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createActorDto: CreateActorDto) {
    await this.actorExist(createActorDto.name);
    return await this.databaseService.actor.create({ data: createActorDto });
  }

  async findAll() {
    return await this.databaseService.actor.findMany({});
  }

  async findOne(id: number) {
    const actorExist = await this.databaseService.actor.findUnique({
      where: { id },
    });
    if (!actorExist)
      throw new NotFoundException(`Actor with ID ${id} does not exist!`);
    return actorExist;
  }

  async update(id: number, updateActorDto: UpdateActorDto) {
    await this.findOne(id);
    await this.actorExist(updateActorDto.name);

    return await this.databaseService.actor.update({
      where: { id },
      data: updateActorDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.actor.delete({ where: { id } });
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
