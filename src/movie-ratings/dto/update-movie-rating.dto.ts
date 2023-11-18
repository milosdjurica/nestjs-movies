// create-rating.dto.ts
import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateMovieRatingDto {
  @IsNotEmpty()
  @IsNumber()
  readonly score: number;
}
