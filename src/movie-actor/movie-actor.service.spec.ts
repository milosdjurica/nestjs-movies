import { Test, TestingModule } from '@nestjs/testing';
import { MovieActorService } from './movie-actor.service';

describe('MovieActorService', () => {
  let service: MovieActorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieActorService],
    }).compile();

    service = module.get<MovieActorService>(MovieActorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
