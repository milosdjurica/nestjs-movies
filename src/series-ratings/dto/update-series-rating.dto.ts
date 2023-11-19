import { IsNotEmpty, IsNumber, Max } from "class-validator";

export class UpdateSeriesRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(10)
  readonly score: number;
}
