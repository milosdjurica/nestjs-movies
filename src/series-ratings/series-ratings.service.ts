import { Injectable } from '@nestjs/common';
import { CreateSeriesRatingDto } from './dto/create-series-rating.dto';
import { UpdateSeriesRatingDto } from './dto/update-series-rating.dto';

@Injectable()
export class SeriesRatingsService {
  create(createSeriesRatingDto: CreateSeriesRatingDto) {
    return 'This action adds a new seriesRating';
  }

  findAll() {
    return `This action returns all seriesRatings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seriesRating`;
  }

  update(id: number, updateSeriesRatingDto: UpdateSeriesRatingDto) {
    return `This action updates a #${id} seriesRating`;
  }

  remove(id: number) {
    return `This action removes a #${id} seriesRating`;
  }
}
