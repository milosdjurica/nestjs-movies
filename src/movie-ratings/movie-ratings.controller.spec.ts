import { Test, TestingModule } from '@nestjs/testing';
import { MovieRatingsController } from './movie-ratings.controller';
import { MovieRatingsService } from './movie-ratings.service';

describe('MovieRatingsController', () => {
  let controller: MovieRatingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieRatingsController],
      providers: [MovieRatingsService],
    }).compile();

    controller = module.get<MovieRatingsController>(MovieRatingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
