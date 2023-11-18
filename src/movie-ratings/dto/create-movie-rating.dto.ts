// create-rating.dto.ts
import { IsNotEmpty, IsNumber, Max } from "class-validator";

export class CreateMovieRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(10)
  readonly score: number;

  @IsNotEmpty()
  @IsNumber()
  readonly movieId: number;
}
