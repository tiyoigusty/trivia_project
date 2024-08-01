import { Test, TestingModule } from '@nestjs/testing';
import { DiamondService } from './diamond.service';

describe('DiamondService', () => {
  let service: DiamondService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiamondService],
    }).compile();

    service = module.get<DiamondService>(DiamondService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
