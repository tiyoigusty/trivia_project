import { Test, TestingModule } from '@nestjs/testing';
import { DiamondController } from './diamond.controller';
import { DiamondService } from './diamond.service';

describe('DiamondController', () => {
  let controller: DiamondController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiamondController],
      providers: [DiamondService],
    }).compile();

    controller = module.get<DiamondController>(DiamondController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
