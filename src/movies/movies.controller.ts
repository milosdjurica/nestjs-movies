import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { Prisma } from "@prisma/client";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  create(@Body() createMovieDto: Prisma.MovieCreateInput) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.moviesService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMovieDto: Prisma.MovieUpdateInput,
  ) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.moviesService.remove(+id);
  }
}
