// UpdateUserDto
import { IsEnum } from "class-validator";
import { Role } from "./roles.enum";

export class ChangeRoleDto {
  @IsEnum(Role)
  readonly role: Role;
}
