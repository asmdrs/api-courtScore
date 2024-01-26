import { Test, TestingModule } from '@nestjs/testing';
import { TournamentManagerController } from './tournament-manager.controller';

describe('TournamentManagerController', () => {
  let controller: TournamentManagerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournamentManagerController],
    }).compile();

    controller = module.get<TournamentManagerController>(TournamentManagerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
