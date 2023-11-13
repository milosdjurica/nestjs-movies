import { DatabaseService } from '@Src/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SeriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSeriesDto: Prisma.SeriesCreateInput) {
    return this.databaseService.series.create({ data: createSeriesDto });
  }

  async findAll() {
    return this.databaseService.series.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.series.findUnique({ where: { id } });
  }

  async update(id: number, updateSeriesDto: Prisma.SeriesUpdateInput) {
    return this.databaseService.series.update({
      where: { id },
      data: updateSeriesDto,
    });
  }

  remove(id: number) {
    return this.databaseService.series.delete({ where: { id } });
  }
}
