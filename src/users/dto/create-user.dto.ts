// CreateUserDto
import { IsString, IsEnum, IsOptional } from "class-validator";
import { Role } from "./roles.enum";

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsEnum(Role)
  @IsOptional()
  readonly role?: Role;
}
