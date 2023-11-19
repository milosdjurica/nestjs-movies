import { Test, TestingModule } from '@nestjs/testing';
import { SeriesGenreService } from './series-genre.service';

describe('SeriesGenreService', () => {
  let service: SeriesGenreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeriesGenreService],
    }).compile();

    service = module.get<SeriesGenreService>(SeriesGenreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
