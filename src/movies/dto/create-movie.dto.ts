import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly length: number;

  // TODO remove this from here, and get it out of the JWT token later
  @IsNotEmpty()
  @IsNumber()
  createdById: number;
}
