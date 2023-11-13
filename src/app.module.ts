import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { SeriesModule } from './series/series.module';

@Module({
  imports: [DatabaseModule, UsersModule, MoviesModule, SeriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
