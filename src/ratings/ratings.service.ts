import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "@Src/database/database.service";
import { CreateRatingDto, UpdateRatingDto } from "./dto";

@Injectable()
export class RatingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRatingDto: CreateRatingDto) {
    try {
      return await this.databaseService.rating.create({
        data: createRatingDto,
      });
    } catch (error) {
      console.error("Error creating rating:", error);
      throw new Error("Failed to create rating.");
    }
  }

  async findAll() {
    try {
      return await this.databaseService.rating.findMany({});
    } catch (error) {
      console.error("Error fetching ratings:", error);
      throw new Error("Failed to fetch ratings.");
    }
  }

  async findOne(id: number) {
    try {
      return await this.databaseService.rating.findUnique({ where: { id } });
    } catch (error) {
      console.error("Error fetching rating by ID:", error);
      throw new NotFoundException(`Rating with ID ${id} not found.`);
    }
  }

  async update(id: number, updateRatingDto: UpdateRatingDto) {
    try {
      return await this.databaseService.rating.update({
        where: { id },
        data: updateRatingDto,
      });
    } catch (error) {
      console.error("Error updating rating:", error);
      throw new Error(`Failed to update rating with ID ${id}.`);
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.rating.delete({ where: { id } });
    } catch (error) {
      console.error("Error deleting rating:", error);
      throw new Error(`Failed to delete rating with ID ${id}.`);
    }
  }
}
