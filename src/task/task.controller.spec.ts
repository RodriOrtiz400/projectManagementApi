import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { getModelToken } from '@nestjs/mongoose';

const mockUserModel = {
  findById: jest.fn(),
};

const mockTaskModel = {
  create: jest.fn(),
  find: jest.fn(),
};

describe('TaskController', () => {
  let controller: TaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
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

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
