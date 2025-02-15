import { Test, TestingModule } from '@nestjs/testing';
import { UssdController } from './ussd.controller';

describe('UssdController', () => {
  let controller: UssdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UssdController],
    }).compile();

    controller = module.get<UssdController>(UssdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
