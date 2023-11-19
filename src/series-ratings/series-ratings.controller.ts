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
import { SeriesRatingsService } from "./series-ratings.service";
import { CreateSeriesRatingDto } from "./dto/create-series-rating.dto";
import { UpdateSeriesRatingDto } from "./dto/update-series-rating.dto";
import { GetCurrentUserId } from "@Src/common/decorators";

@Controller("series-ratings")
export class SeriesRatingsController {
  constructor(private readonly seriesRatingsService: SeriesRatingsService) {}

  @Post()
  create(
    @Body() createSeriesRatingDto: CreateSeriesRatingDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.seriesRatingsService.create(userId, createSeriesRatingDto);
  }

  @Get()
  findAll() {
    return this.seriesRatingsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.seriesRatingsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSeriesRatingDto: UpdateSeriesRatingDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.seriesRatingsService.update(id, updateSeriesRatingDto, userId);
  }

  @Delete(":id")
  remove(
    @Param("id", ParseIntPipe) id: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.seriesRatingsService.remove(id, userId);
  }
}
