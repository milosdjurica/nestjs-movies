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
import { GetCurrentUserId, Roles } from "@Src/common/decorators";
import { RolesGuard } from "@Src/common/guards";
import { Role } from "@prisma/client";
import { ParseOptionalBooleanPipe } from "@Src/common/pipes";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(
    @Body() createMovieDto: CreateMovieDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.moviesService.create(createMovieDto, userId);
  }

  @Get()
  findAll(
    // TODO add query string for GTE LTE EQUALS avg rating (but need multiple queries and to calculate AVG)
    // TODO This should be done in database -> add field avgRating and should calculate automatically whenever new rating is added
    @Query("page", new ParseIntPipe({ optional: true })) page: number = 1,
    @Query("perPage", new ParseIntPipe({ optional: true }))
    perPage: number = 10,
    @Query("includeActors", ParseOptionalBooleanPipe) includeActors: boolean,
    @Query("includeGenres", ParseOptionalBooleanPipe) includeGenres: boolean,
    @Query("includeRatings", ParseOptionalBooleanPipe) includeRatings: boolean,
    // * If use actorNames and genreNames in combination -> it will only return movies with BOTH :
    // * all movies that have at least one Actor from provided actors,
    // * and at the same time at least one genre from provided genres
    // ! && && &&
    // ! Example: /movies?actorNames=Leonardo%20DiCaprio&genreNames=Horror
    // ! it will look for horror in which Leonardo DiCaprio is actor !!!
    @Query("actorNames") actorNames: string,
    @Query("genreNames") genreNames: string,
  ) {
    return this.moviesService.findAll(
      page,
      perPage,
      includeActors,
      includeGenres,
      includeRatings,
      actorNames,
      genreNames,
    );
  }

  @Get(":id")
  findOne(
    @Param("id", ParseIntPipe) id: number,
    @Query("includeActors", ParseOptionalBooleanPipe) includeActors: boolean,
    @Query("includeGenres", ParseOptionalBooleanPipe) includeGenres: boolean,
    @Query("includeRatings", ParseOptionalBooleanPipe) includeRatings: boolean,
  ) {
    return this.moviesService.findOne(
      id,
      includeActors,
      includeGenres,
      includeRatings,
    );
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
