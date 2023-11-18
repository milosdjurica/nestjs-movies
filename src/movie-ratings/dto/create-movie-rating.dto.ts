// create-rating.dto.ts
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateMovieRatingDto {
  @IsNotEmpty()
  @IsNumber()
  readonly score: number;

  @IsNotEmpty()
  @IsNumber()
  readonly movieId: number;
}
