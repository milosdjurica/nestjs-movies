import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsInt()
  readonly length: number;

  // TODO remove this from here, and get it out of the JWT token later
  @IsNotEmpty()
  @IsInt()
  readonly createdById: number;
}
