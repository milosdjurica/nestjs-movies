import { IsOptional, IsString } from "class-validator";

export class CreateGenreDto {
  @IsOptional()
  @IsString()
  readonly name: string;
}
