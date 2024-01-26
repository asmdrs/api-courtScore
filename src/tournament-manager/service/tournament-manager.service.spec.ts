import { Test, TestingModule } from '@nestjs/testing';
import { TournamentManagerService } from './tournament-manager.service';

describe('TournamentManagerService', () => {
  let service: TournamentManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournamentManagerService],
    }).compile();

    service = module.get<TournamentManagerService>(TournamentManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
