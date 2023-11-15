import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ActorsService } from "./actors.service";
import { CreateActorDto, UpdateActorDto } from "./dto";

@Controller("actors")
export class ActorsController {
  constructor(private readonly actorService: ActorsService) {}

  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @Get()
  findAll() {
    return this.actorService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.actorService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorService.update(+id, updateActorDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.actorService.remove(+id);
  }
}
