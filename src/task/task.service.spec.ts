import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { getModelToken } from '@nestjs/mongoose';

const mockUserModel = {
  findById: jest.fn(),
};

const mockTaskModel = {
  create: jest.fn(),
  find: jest.fn(),
};

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
        {
          provide: getModelToken('Task'),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
