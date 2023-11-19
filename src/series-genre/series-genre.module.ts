import { Module } from '@nestjs/common';
import { SeriesGenreService } from './series-genre.service';

@Module({
  providers: [SeriesGenreService]
})
export class SeriesGenreModule {}
