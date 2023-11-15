import { Module } from "@nestjs/common";
import { MovieActorService } from "./movie-actor.service";

@Module({
  providers: [MovieActorService],
})
export class MovieActorModule {}
