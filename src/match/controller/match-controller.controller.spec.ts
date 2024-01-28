import { Test, TestingModule } from '@nestjs/testing';
import { MatchControllerController } from './match-controller.controller';

describe('MatchControllerController', () => {
  let controller: MatchControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchControllerController],
    }).compile();

    controller = module.get<MatchControllerController>(MatchControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
