import { UpdateActorDto } from "@Src/actors/dto";
import { UpdateGenreDto } from "@Src/genres/dto";
import { Type } from "class-transformer";
import {
  IsOptional,
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
} from "class-validator";

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsNumber()
  readonly length?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateActorDto)
  readonly actors?: UpdateActorDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateGenreDto)
  readonly genres?: UpdateGenreDto[];
}
