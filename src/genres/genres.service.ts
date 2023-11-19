import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { DatabaseService } from "@Src/database/database.service";
import { CreateGenreDto, UpdateGenreDto } from "./dto";

@Injectable()
export class GenresService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createGenreDto: CreateGenreDto) {
    return await this.databaseService.genre.create({ data: createGenreDto });
  }

  async findAll() {
    return await this.databaseService.genre.findMany({});
  }

  async findOne(id: number) {
    const genreExist = await this.databaseService.genre.findUnique({
      where: { id },
    });
    if (!genreExist)
      throw new NotFoundException(`Genre with ID ${id} does not exist!`);
    return genreExist;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    await this.findOne(id);
    await this.genreNameExist(updateGenreDto.name);

    return await this.databaseService.genre.update({
      where: { id },
      data: updateGenreDto,
    });
  }

  async remove(id: number) {
    return await this.databaseService.genre.delete({ where: { id } });
  }

  async genreNameExist(name: string) {
    const foundGenre = await this.databaseService.genre.findUnique({
      where: { name },
    });
    if (foundGenre)
      throw new ConflictException(
        `Genre with name ${name} already exist! Please provide another name.`,
      );
  }
}
