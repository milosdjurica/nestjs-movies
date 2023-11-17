// UpdateUserDto
import { IsString, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  password?: string;
}
