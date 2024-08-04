import { Test, TestingModule } from '@nestjs/testing';
import { UsersTestService } from './users-test.service';

describe('UsersTestService', () => {
  let service: UsersTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersTestService],
    }).compile();

    service = module.get<UsersTestService>(UsersTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
