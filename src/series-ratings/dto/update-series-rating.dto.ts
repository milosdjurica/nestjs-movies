import { PartialType } from '@nestjs/mapped-types';
import { CreateSeriesRatingDto } from './create-series-rating.dto';

export class UpdateSeriesRatingDto extends PartialType(CreateSeriesRatingDto) {}
