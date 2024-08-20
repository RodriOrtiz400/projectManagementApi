import { Test, TestingModule } from '@nestjs/testing';
import { EmailLoggerService } from './email-logger.service';

describe('EmailLoggerService', () => {
  let service: EmailLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailLoggerService],
    }).compile();

    service = module.get<EmailLoggerService>(EmailLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
