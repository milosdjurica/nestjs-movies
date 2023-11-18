import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateSeriesDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numOfSeasons: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numOfEpisodes: number;
}
