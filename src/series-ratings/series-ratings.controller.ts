import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeriesRatingsService } from './series-ratings.service';
import { CreateSeriesRatingDto } from './dto/create-series-rating.dto';
import { UpdateSeriesRatingDto } from './dto/update-series-rating.dto';

@Controller('series-ratings')
export class SeriesRatingsController {
  constructor(private readonly seriesRatingsService: SeriesRatingsService) {}

  @Post()
  create(@Body() createSeriesRatingDto: CreateSeriesRatingDto) {
    return this.seriesRatingsService.create(createSeriesRatingDto);
  }

  @Get()
  findAll() {
    return this.seriesRatingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seriesRatingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeriesRatingDto: UpdateSeriesRatingDto) {
    return this.seriesRatingsService.update(+id, updateSeriesRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seriesRatingsService.remove(+id);
  }
}
