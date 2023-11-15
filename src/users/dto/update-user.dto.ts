// UpdateUserDto
import { IsString, IsEnum, IsOptional } from "class-validator";
import { Role } from "./roles.enum";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsEnum(Role)
  readonly role?: Role;
}
