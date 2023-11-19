import { Test, TestingModule } from '@nestjs/testing';
import { SeriesRatingsService } from './series-ratings.service';

describe('SeriesRatingsService', () => {
  let service: SeriesRatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeriesRatingsService],
    }).compile();

    service = module.get<SeriesRatingsService>(SeriesRatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
