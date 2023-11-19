import { CreateActorDto } from "@Src/actors/dto";
import { CreateGenreDto } from "@Src/genres/dto";
import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";

export class CreateSeriesDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numOfSeasons: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numOfEpisodes: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateActorDto)
  actors?: CreateActorDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateGenreDto)
  genres?: CreateGenreDto[];
}
