import { IsOptional, IsString } from "class-validator";

export class UpdateGenreDto {
  @IsOptional()
  @IsString()
  readonly name: string;
}
