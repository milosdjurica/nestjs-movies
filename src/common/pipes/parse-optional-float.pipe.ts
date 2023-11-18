import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
export class ParseOptionalFloatPipe
  implements PipeTransform<string, number | undefined>
{
  transform(value: string, metadata: ArgumentMetadata): number | undefined {
    if (!value) {
      return undefined;
    }

    if (!this.isFloat(value)) {
      throw new BadRequestException(
        `Invalid decimal value for ${metadata.data} parameter! Please provide value in format : 3.333 .`,
      );
    }

    return parseFloat(value);
  }

  private isFloat(value: string): boolean {
    // Regex pattern to check if the entire string is a valid float
    const floatRegex = /^\d+(\.\d+)?$/;
    return floatRegex.test(value);
  }
}
