import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateSeriesDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  numOfSeasons?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  numOfEpisodes?: number;
}
