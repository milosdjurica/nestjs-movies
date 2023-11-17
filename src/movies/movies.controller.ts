import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto, UpdateMovieDto } from "./dto";
import { Roles } from "@Src/common/decorators";
import { RolesGuard } from "@Src/common/guards";
import { Role } from "@prisma/client";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  // TODO add createdBy ID from JWT token (ID of user who is creating this movie)
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, updateMovieDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.moviesService.remove(id);
  }
}
