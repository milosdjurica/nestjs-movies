import { Module } from '@nestjs/common';
import { SeriesActorService } from './series-actor.service';

@Module({
  providers: [SeriesActorService]
})
export class SeriesActorModule {}
