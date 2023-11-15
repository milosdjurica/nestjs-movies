// update-rating.dto.ts
import { IsNumber } from "class-validator";

export class UpdateRatingDto {
  @IsNumber()
  readonly score?: number;

  @IsNumber()
  readonly movieId?: number;

  @IsNumber()
  readonly seriesId?: number;
}
