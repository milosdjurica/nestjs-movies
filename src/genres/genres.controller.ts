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
} from "@nestjs/common";
import { GenresService } from "./genres.service";
import { CreateGenreDto, UpdateGenreDto } from "./dto";
import { Roles } from "@Src/common/decorators";
import { Role } from "@prisma/client";
import { RolesGuard } from "@Src/common/guards";

@Controller("genres")
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.genresService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return this.genresService.update(id, updateGenreDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.genresService.remove(id);
  }
}
