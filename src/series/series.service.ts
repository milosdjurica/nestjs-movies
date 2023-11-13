import { DatabaseService } from '@Src/database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SeriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createSeriesDto: Prisma.SeriesCreateInput) {
    return this.databaseService.series.create({ data: createSeriesDto });
  }

  findAll() {
    return this.databaseService.series.findMany({});
  }

  findOne(id: number) {
    return this.databaseService.series.findUnique({ where: { id } });
  }

  update(id: number, updateSeriesDto: Prisma.SeriesUpdateInput) {
    return this.databaseService.series.update({
      where: { id },
      data: updateSeriesDto,
    });
  }

  remove(id: number) {
    return this.databaseService.series.delete({ where: { id } });
  }
}
