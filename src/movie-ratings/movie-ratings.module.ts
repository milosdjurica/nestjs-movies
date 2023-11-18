import { Module } from '@nestjs/common';
import { MovieRatingsService } from './movie-ratings.service';
import { MovieRatingsController } from './movie-ratings.controller';

@Module({
  controllers: [MovieRatingsController],
  providers: [MovieRatingsService],
})
export class MovieRatingsModule {}
