// UpdateUserDto
import { IsString, IsOptional } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly username?: string;

  // TODO maybe add old password to check if they match

  @IsOptional()
  @IsString()
  password?: string;
}
