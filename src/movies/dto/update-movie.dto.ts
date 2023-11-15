import { IsOptional, IsString, IsNumber } from "class-validator";

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
}
