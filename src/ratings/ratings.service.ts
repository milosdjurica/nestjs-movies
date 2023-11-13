import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@Src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RatingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRatingDto: Prisma.RatingCreateInput) {
    return this.databaseService.rating.create({ data: createRatingDto });
  }

  async findAll() {
    return this.databaseService.rating.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.rating.findUnique({ where: { id } });
  }

  async update(id: number, updateRatingDto: Prisma.RatingUpdateInput) {
    return this.databaseService.rating.update({
      where: { id },
      data: updateRatingDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.rating.delete({ where: { id } });
  }
}
