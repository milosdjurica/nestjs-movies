import { IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @IsString()
  @MinLength(4)
  @MaxLength(30)
  readonly username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  readonly password: string;
}
