import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { MovieRatingsService } from "./movie-ratings.service";
import { CreateMovieRatingDto } from "./dto/create-movie-rating.dto";
import { UpdateMovieRatingDto } from "./dto/update-movie-rating.dto";
import { GetCurrentUserId } from "@Src/common/decorators";

@Controller("movie-ratings")
export class MovieRatingsController {
  constructor(private readonly movieRatingsService: MovieRatingsService) {}

  @Post()
  create(
    @Body() createMovieRatingDto: CreateMovieRatingDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.movieRatingsService.create(userId, createMovieRatingDto);
  }

  @Get()
  // TODO query find all for specific user or specific movie or find all greater than or less than or equal
  // TODO include movies and users objects ???
  findAll() {
    return this.movieRatingsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.movieRatingsService.findOne(id);
  }

  // TODO user can update only his ratings
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) movieRatingId: number,
    @Body() updateMovieRatingDto: UpdateMovieRatingDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.movieRatingsService.update(
      movieRatingId,
      updateMovieRatingDto,
      userId,
    );
  }

  // TODO user can delete only his ratings
  @Delete(":id")
  remove(
    @Param("id", ParseIntPipe) id: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.movieRatingsService.remove(id, userId);
  }
}
