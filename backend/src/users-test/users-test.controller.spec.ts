import { Test, TestingModule } from '@nestjs/testing';
import { UsersTestController } from './users-test.controller';
import { UsersTestService } from './users-test.service';

describe('UsersTestController', () => {
  let controller: UsersTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersTestController],
      providers: [UsersTestService],
    }).compile();

    controller = module.get<UsersTestController>(UsersTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
