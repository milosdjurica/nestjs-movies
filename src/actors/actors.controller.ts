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
import { ActorsService } from "./actors.service";
import { CreateActorDto, UpdateActorDto } from "./dto";
import { Roles } from "@Src/common/decorators";
import { RolesGuard } from "@Src/common/guards";
import { Role } from "@prisma/client";

@Controller("actors")
export class ActorsController {
  constructor(private readonly actorService: ActorsService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @Get()
  findAll() {
    return this.actorService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.actorService.findOne(id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateActorDto: UpdateActorDto,
  ) {
    return this.actorService.update(id, updateActorDto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.actorService.remove(id);
  }
}
