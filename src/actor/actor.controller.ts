import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ActorService } from './actor.service';
import { Prisma } from '@prisma/client';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Post()
  create(@Body() createActorDto: Prisma.ActorCreateInput) {
    return this.actorService.create(createActorDto);
  }

  @Get()
  findAll() {
    return this.actorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActorDto: Prisma.ActorUpdateInput,
  ) {
    return this.actorService.update(+id, updateActorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorService.remove(+id);
  }
}
