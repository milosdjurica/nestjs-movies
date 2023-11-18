import { CreateActorDto } from "@Src/actors/dto";
import { CreateGenreDto } from "@Src/genres/dto";
import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsOptional,
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
