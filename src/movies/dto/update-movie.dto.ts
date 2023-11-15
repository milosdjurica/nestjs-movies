import { IsOptional, IsString, IsInt } from "class-validator";

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  readonly title?: string;

  @IsOptional()
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsInt()
  readonly length?: number;
}
