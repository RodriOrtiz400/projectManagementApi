import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { getModelToken } from '@nestjs/mongoose';

const mockProjectModel = {
  findById: jest.fn(),
};

const mockTaskModel = {
  findById: jest.fn(),
};

const mockCommentModel = {};

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
