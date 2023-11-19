import { IsNotEmpty, IsNumber, Max } from "class-validator";

export class UpdateMovieRatingDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(10)
  readonly score: number;
}
