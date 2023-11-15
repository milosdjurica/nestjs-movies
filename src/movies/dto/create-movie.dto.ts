import { CreateActorDto } from "@Src/actors/dto";
import { CreateGenreDto } from "@Src/genres/dto";
import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
} from "class-validator";

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly length: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateActorDto)
  actors?: CreateActorDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGenreDto)
  genres?: CreateGenreDto[];

  // TODO remove this from here, and get it out of the JWT token later
  @IsNotEmpty()
  @IsNumber()
  createdById: number;
}
