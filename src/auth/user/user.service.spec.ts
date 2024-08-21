import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { PasswordHelper } from '../helper/password.helper';

const mockUserModel = {
  create: jest.fn(),
  findOne: jest.fn(),
};

const mockPasswordHelper = {
  hashData: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
        {
          provide: PasswordHelper,
          useValue: mockPasswordHelper,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
