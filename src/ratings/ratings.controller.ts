import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RatingsService } from "./ratings.service";
import { CreateRatingDto, UpdateRatingDto } from "./dto";

@Controller("ratings")
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post()
  create(@Body() createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto);
  }

  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.ratingsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRatingDto: UpdateRatingDto) {
    return this.ratingsService.update(+id, updateRatingDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.ratingsService.remove(+id);
  }
}
