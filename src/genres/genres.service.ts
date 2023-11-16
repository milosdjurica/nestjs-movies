import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DatabaseService } from "@Src/database/database.service";
import { CreateGenreDto, UpdateGenreDto } from "./dto";

@Injectable()
export class GenresService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createGenreDto: CreateGenreDto) {
    try {
      return await this.databaseService.genre.create({ data: createGenreDto });
    } catch (error) {
      console.error(`Error creating genre:`, error);
      throw new Error("An error occurred while creating the genre.");
    }
  }

  async findAll() {
    try {
      return await this.databaseService.genre.findMany({});
    } catch (error) {
      console.error(`Error fetching genres:`, error);
      throw new Error("An error occurred while fetching genres.");
    }
  }

  async findOne(id: number) {
    try {
      return await this.databaseService.genre.findUnique({ where: { id } });
    } catch (error) {
      console.error(`Error fetching genre with ID ${id}:`, error);
      throw new NotFoundException(`Genre with ID ${id} not found.`);
    }
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    try {
      await this.genreNameExist(updateGenreDto.name);

      return await this.databaseService.genre.update({
        where: { id },
        data: updateGenreDto,
      });
    } catch (error) {
      console.error(`Error updating genre with ID ${id}:`, error);
      if (error instanceof HttpException) throw error;
      throw new Error("An error occurred while updating the genre.");
    }
  }

  async remove(id: number) {
    try {
      return await this.databaseService.genre.delete({ where: { id } });
    } catch (error) {
      console.error(`Error deleting genre with ID ${id}:`, error);
      throw new Error("An error occurred while deleting the genre.");
    }
  }

  async genreNameExist(name: string) {
    const foundGenre = await this.databaseService.genre.findUnique({
      where: { name },
    });
    if (foundGenre)
      throw new ConflictException(
        `Genre with name ${name} already exist! Please provide another name`,
      );
  }
}
