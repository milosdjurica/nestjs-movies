import { Test, TestingModule } from '@nestjs/testing';
import { SeriesRatingsController } from './series-ratings.controller';
import { SeriesRatingsService } from './series-ratings.service';

describe('SeriesRatingsController', () => {
  let controller: SeriesRatingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeriesRatingsController],
      providers: [SeriesRatingsService],
    }).compile();

    controller = module.get<SeriesRatingsController>(SeriesRatingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
