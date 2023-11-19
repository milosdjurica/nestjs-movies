import { IsNotEmpty, IsNumber, Max } from "class-validator";

export class CreateSeriesRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(10)
  readonly score: number;

  @IsNotEmpty()
  @IsNumber()
  readonly seriesId: number;
}
