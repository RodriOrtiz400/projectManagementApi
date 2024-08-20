import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailLoggerService } from '../../email/email-logger/email-logger.service';
import { CreateUserDto, CredentialsDto } from '../user/dto';
import { UserCreated } from '../user/interface/user-created.interface';

describe.only('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let emailService: EmailLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: EmailLoggerService,
          useValue: {
            sendNotificationEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    emailService = module.get<EmailLoggerService>(EmailLoggerService);
  });

  describe('login', () => {
    it('should return a token', async () => {
      const credentials: CredentialsDto = { email: 'test@example.com', password: 'password' };
      const result = { access_token: 'test-token' };

      jest.spyOn(authService, 'login').mockResolvedValue(result);

      expect(await authController.login(credentials)).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new user and return it', async () => {
      const userDto: CreateUserDto = { email: 'test@example.com', password: 'password' };
      const newUser: UserCreated = { email: 'test@example.com', name: 'Test User', role: 'user' };

      jest.spyOn(authService, 'create').mockResolvedValue(newUser);
      jest.spyOn(emailService, 'sendNotificationEmail').mockResolvedValue(undefined);

      expect(await authController.create(userDto)).toBe(newUser);
      expect(emailService.sendNotificationEmail).toHaveBeenCalledWith({
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        action: 'User Created Successfully',
      });
    });
  });
});
