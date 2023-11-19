import { Module } from "@nestjs/common";
import { SeriesService } from "./series.service";
import { SeriesController } from "./series.controller";
import { SeriesActorService } from "@Src/series-actor/series-actor.service";
import { SeriesGenreService } from "@Src/series-genre/series-genre.service";

@Module({
  controllers: [SeriesController],
  providers: [SeriesService, SeriesActorService, SeriesGenreService],
})
export class SeriesModule {}
