import { DatabaseService } from '@Src/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ActorService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createActorDto: Prisma.ActorCreateInput) {
    return this.databaseService.actor.create({ data: createActorDto });
  }

  async findAll() {
    return this.databaseService.actor.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.actor.findUnique({ where: { id } });
  }

  async update(id: number, updateActorDto: Prisma.ActorUpdateInput) {
    return this.databaseService.actor.update({
      where: { id },
      data: updateActorDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.actor.delete({ where: { id } });
  }
}
