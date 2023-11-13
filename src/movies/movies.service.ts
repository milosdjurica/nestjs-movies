import { DatabaseService } from "@Src/database/database.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class MoviesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createMovieDto: Prisma.MovieCreateInput) {
    return this.databaseService.movie.create({ data: createMovieDto });
  }

  async findAll() {
    return this.databaseService.movie.findMany({});
  }

  async findOne(id: number) {
    return this.databaseService.movie.findUnique({ where: { id } });
  }

  async update(id: number, updateMovieDto: Prisma.MovieUpdateInput) {
    return this.databaseService.movie.update({
      where: {
        id,
      },
      data: updateMovieDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.movie.delete({ where: { id } });
  }
}
