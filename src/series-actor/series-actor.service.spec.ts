import { Test, TestingModule } from '@nestjs/testing';
import { SeriesActorService } from './series-actor.service';

describe('SeriesActorService', () => {
  let service: SeriesActorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeriesActorService],
    }).compile();

    service = module.get<SeriesActorService>(SeriesActorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
