import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateSeriesDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
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

  // TODO remove this from here, and get it out of the JWT token later
  @IsNotEmpty()
  @IsNumber()
  createdById: number;
}
