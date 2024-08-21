import { Test, TestingModule } from '@nestjs/testing';
import { EmailLoggerService } from './email-logger.service';
import { MailerService } from '@nestjs-modules/mailer';

const mockMailerService = {
  sendMail: jest.fn(),
};

describe('EmailLoggerService', () => {
  let service: EmailLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailLoggerService,
        {
          provide: MailerService,
          useValue: mockMailerService,
        },
      ],
    }).compile();

    service = module.get<EmailLoggerService>(EmailLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
