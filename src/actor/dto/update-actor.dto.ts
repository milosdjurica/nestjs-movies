import { IsOptional, IsString } from "class-validator";

export class UpdateActorDto {
  @IsOptional()
  @IsString()
  readonly name: string;
}
