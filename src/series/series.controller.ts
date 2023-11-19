import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from "@nestjs/common";
import { SeriesService } from "./series.service";
import { CreateSeriesDto, UpdateSeriesDto } from "./dto";
import { GetCurrentUserId, Roles } from "@Src/common/decorators";
import { Role } from "@prisma/client";
import { RolesGuard } from "@Src/common/guards";
import { ParseOptionalBooleanPipe } from "@Src/common/pipes";

@Controller("series")
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(
    @Body() createSeriesDto: CreateSeriesDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.seriesService.create(createSeriesDto, userId);
  }

  // TODO filter by rating, number of seasons, number of episodes, actors, genres,
  // TODO include actors, genres and ratings in, and add page and perPage
  @Get()
  findAll(
    @Query("page", new ParseIntPipe({ optional: true })) page: number = 1,
    @Query("perPage", new ParseIntPipe({ optional: true }))
    perPage: number = 10,
    @Query("includeActors", ParseOptionalBooleanPipe) includeActors: boolean,
    @Query("includeGenres", ParseOptionalBooleanPipe) includeGenres: boolean,
    @Query("actorNames") actorNames: string,
    @Query("genreNames") genreNames: string,
  ) {
    return this.seriesService.findAll(
      page,
      perPage,
      includeActors,
      includeGenres,
      actorNames,
      genreNames,
    );
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.seriesService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSeriesDto: UpdateSeriesDto,
  ) {
    return this.seriesService.update(id, updateSeriesDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.seriesService.remove(id);
  }
}
