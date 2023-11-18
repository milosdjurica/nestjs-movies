import { Test, TestingModule } from '@nestjs/testing';
import { MovieRatingsService } from './movie-ratings.service';

describe('MovieRatingsService', () => {
  let service: MovieRatingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieRatingsService],
    }).compile();

    service = module.get<MovieRatingsService>(MovieRatingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
