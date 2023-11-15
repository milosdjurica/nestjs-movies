import { DatabaseService } from "@Src/database/database.service";
import { Injectable } from "@nestjs/common";
import { CreateSeriesDto, UpdateSeriesDto } from "./dto";

@Injectable()
export class SeriesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSeriesDto: CreateSeriesDto) {
    try {
      return await this.databaseService.series.create({
        data: createSeriesDto,
      });
    } catch (error) {
      console.error("Error creating series:", error);
      throw new Error("Failed to create series.");
    }
  }

  async findAll() {
    try {
      return await this.databaseService.series.findMany({});
    } catch (error) {
      console.error("Error fetching series:", error);
      throw new Error("Failed to fetch series.");
    }
  }

  async findOne(id: number) {
    try {
      return await this.databaseService.series.findUnique({ where: { id } });
    } catch (error) {
      console.error(`Error finding series with id ${id}:`, error);
      throw new Error("Failed to find series.");
    }
  }

  async update(id: number, updateSeriesDto: UpdateSeriesDto) {
    try {
      return await this.databaseService.series.update({
        where: { id },
        data: updateSeriesDto,
      });
    } catch (error) {
      console.error(`Error updating series with id ${id}:`, error);
      throw new Error("Failed to update series.");
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.series.delete({ where: { id } });
    } catch (error) {
      console.error(`Error removing series with id ${id}:`, error);
      throw new Error("Failed to remove series.");
    }
  }
}
