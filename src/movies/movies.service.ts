import { DatabaseService } from "@Src/database/database.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMovieDto, UpdateMovieDto } from "./dto";

@Injectable()
export class MoviesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createMovieDto: CreateMovieDto) {
    try {
      return await this.databaseService.movie.create({ data: createMovieDto });
    } catch (error) {
      console.error("Error creating movie:", error);
      throw new Error("Failed to create movie.");
    }
  }

  async findAll() {
    try {
      return await this.databaseService.movie.findMany({});
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw new Error("Failed to fetch movies.");
    }
  }

  async findOne(id: number) {
    try {
      const movie = await this.databaseService.movie.findUnique({
        where: { id },
      });
      if (!movie) {
        throw new NotFoundException(`Movie with ID ${id} not found.`);
      }
      return movie;
    } catch (error) {
      console.error(`Error fetching movie with ID ${id}:`, error);
      throw new Error("Failed to fetch movie.");
    }
  }

  async update(id: number, updateMovieDto: UpdateMovieDto) {
    try {
      return await this.databaseService.movie.update({
        where: {
          id,
        },
        data: updateMovieDto,
      });
    } catch (error) {
      console.error(`Error updating movie with ID ${id}:`, error);
      throw new Error("Failed to update movie.");
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.movie.delete({ where: { id } });
    } catch (error) {
      console.error(`Error deleting movie with ID ${id}:`, error);
      throw new Error("Failed to delete movie.");
    }
  }
}
