// create-rating.dto.ts
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRatingDto {
  @IsNotEmpty()
  @IsNumber()
  readonly score: number;

  @IsNotEmpty()
  @IsNumber()
  readonly movieId?: number;

  @IsNotEmpty()
  @IsNumber()
  readonly seriesId?: number;

  @IsNotEmpty()
  @IsNumber()
  readonly createdById: number;
}
