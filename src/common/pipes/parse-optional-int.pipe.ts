import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
export class ParseOptionalIntPipe
  implements PipeTransform<string, number | undefined>
{
  transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): number | undefined {
    // Return undefined if the parameter is not provided
    if (value === undefined) {
      return undefined;
    }

    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      throw new BadRequestException(
        `Invalid integer value for ${metadata.data} parameter! Please provide a valid integer.`,
      );
    }

    return parsedValue;
  }
}
