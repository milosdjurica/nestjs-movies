import { Module } from '@nestjs/common';
import { SeriesRatingsService } from './series-ratings.service';
import { SeriesRatingsController } from './series-ratings.controller';

@Module({
  controllers: [SeriesRatingsController],
  providers: [SeriesRatingsService],
})
export class SeriesRatingsModule {}
