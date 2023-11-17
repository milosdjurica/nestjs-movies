import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
export class ParseOptionalBooleanPipe
  implements PipeTransform<string, boolean>
{
  transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): boolean | undefined {
    // ! Return undefined if the parameter is not provided
    if (value === undefined) {
      return undefined;
    }

    if (value.toLowerCase() === "true") {
      return true;
    } else if (value.toLowerCase() === "false") {
      return false;
    } else {
      throw new BadRequestException(
        `Invalid boolean value for ${metadata.data} parameter! Please provide either TRUE or FALSE value.`,
      );
    }
  }
}
