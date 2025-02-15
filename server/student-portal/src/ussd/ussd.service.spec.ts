import { Test, TestingModule } from '@nestjs/testing';
import { UssdService } from './ussd.service';

describe('UssdService', () => {
  let service: UssdService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UssdService],
    }).compile();

    service = module.get<UssdService>(UssdService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
