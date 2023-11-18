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
  findAll() {
    return this.movieRatingsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.movieRatingsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateMovieRatingDto: UpdateMovieRatingDto,
  ) {
    return this.movieRatingsService.update(id, updateMovieRatingDto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.movieRatingsService.remove(id);
  }
}
