// create-actor.dto.ts
import { IsNotEmpty, IsString } from "class-validator";

export class CreateActorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
