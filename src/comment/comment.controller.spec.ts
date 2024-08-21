import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { getModelToken } from '@nestjs/mongoose';

const mockProjectModel = {
  findById: jest.fn(),
};

const mockTaskModel = {
  findById: jest.fn(),
};

const mockCommentModel = {};

describe('CommentController', () => {
  let controller: CommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        CommentService,
        {
          provide: getModelToken('Comment'),
          useValue: mockCommentModel,
        },
        {
          provide: getModelToken('Task'),
          useValue: mockTaskModel,
        },
        {
          provide: getModelToken('Project'),
          useValue: mockProjectModel,
        },
      ],
    }).compile();

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
