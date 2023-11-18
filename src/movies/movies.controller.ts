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
    @Query("includeActors", ParseOptionalBooleanPipe) includeActors: boolean,
    @Query("includeGenres", ParseOptionalBooleanPipe) includeGenres: boolean,
    // * If use actorNames and genreNames in combination -> it will only return movies with BOTH :
    // * all movies that have at least one Actor from provided actors,
    // * and at the same time at least one genre from provided genres
    // ! Example: /movies?actorNames=Leonardo%20DiCaprio&genreNames=Horror
    // ! it will look for horror in which Leonardo DiCaprio is actor !!!
    @Query("actorNames") actorNames: string,
    @Query("genreNames") genreNames: string,
  ) {
    return this.moviesService.findAll(
      includeActors,
      includeGenres,
      actorNames,
      genreNames,
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
