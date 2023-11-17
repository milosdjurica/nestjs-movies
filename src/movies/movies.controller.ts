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
  Query,
} from "@nestjs/common";
import { MoviesService } from "./movies.service";
import { CreateMovieDto, UpdateMovieDto } from "./dto";
import { Roles } from "@Src/common/decorators";
import { RolesGuard } from "@Src/common/guards";
import { Role } from "@prisma/client";
import { ParseOptionalBooleanPipe } from "@Src/common/pipes";

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
  findAll(
    @Query("actors", ParseOptionalBooleanPipe) actors: boolean,
    @Query("genres", ParseOptionalBooleanPipe) genres: boolean,
    @Query("isActing") actorName: string,
    @Query("hasGenre") hasGenre: string,
    // TODO if AllActors=TRUE then it should return a movies where ALL named actors are acting
    @Query("allActors", ParseOptionalBooleanPipe) allActors: boolean,
    @Query("allGenres", ParseOptionalBooleanPipe) allGenres: boolean,
  ) {
    return this.moviesService.findAll(
      actors,
      genres,
      actorName,
      hasGenre,
      allActors,
      allGenres,
    );
  }

  @Get(":id")
  findOne(
    @Param("id", ParseIntPipe) id: number,
    @Query("actors", ParseOptionalBooleanPipe) actors: boolean,
    @Query("genres", ParseOptionalBooleanPipe) genres: boolean,
  ) {
    return this.moviesService.findOne(id, actors, genres);
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
