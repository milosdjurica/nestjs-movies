import { DatabaseService } from "@Src/database/database.service";
import { Injectable } from "@nestjs/common";
import { CreateSeriesDto, UpdateSeriesDto } from "./dto";

@Injectable()
export class SeriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSeriesDto: CreateSeriesDto, userId: number) {
    // TODO check if already exist AND add option to include actors and genres when creating

    return await this.databaseService.series.create({
      data: {
        createdById: userId,
        ...createSeriesDto,
      },
    });
  }

  async findAll() {
    return await this.databaseService.series.findMany({});
  }

  async findOne(id: number) {
    return await this.databaseService.series.findUnique({ where: { id } });
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto) {
    return await this.databaseService.series.update({
      where: { id },
      data: updateSeriesDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.series.delete({ where: { id } });
  }
}
