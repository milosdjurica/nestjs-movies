import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '@Src/database/database.service';

@Injectable()
export class GenresService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createGenreDto: Prisma.GenreCreateInput) {
    return this.databaseService.genre.create({ data: createGenreDto });
  }

  async findAll() {
    return this.databaseService.genre.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.genre.findUnique({ where: { id } });
  }

  async update(id: number, updateGenreDto: Prisma.GenreUpdateInput) {
    return this.databaseService.genre.update({
      where: { id },
      data: updateGenreDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.genre.delete({ where: { id } });
  }
}
