import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from './common.service';
import { LocalFileRepository } from '../repository/localfile.repository';

describe('CommonService', () => {
  let service: CommonService;
  let repository: LocalFileRepository;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonService,
        {
          provide: LocalFileRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CommonService>(CommonService);
    repository = module.get<LocalFileRepository>(LocalFileRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload files successfully', async () => {
      const mockFile = {
        originalname: 'test.jpg',
        path: 'uploads/test.jpg',
        mimetype: 'image/jpeg',
      } as Express.Multer.File;

      const mockLocalFile = {
        id: 1,
        filename: 'test.jpg',
        path: 'http://localhost:3000/uploads/test.jpg',
        mimetype: 'image/jpeg',
        user_id: 1,
      };

      const mockReq = {
        protocol: 'http',
        get: jest.fn().mockReturnValue('localhost:3000'),
      };

      mockRepository.create.mockReturnValue(mockLocalFile);
      mockRepository.save.mockResolvedValue(mockLocalFile);

      const result = await service.uploadFile(mockReq, 1, [mockFile]);

      expect(result).toEqual({
        result: [mockLocalFile],
        message: 'Successful!',
      });
      expect(mockRepository.create).toHaveBeenCalledWith({
        filename: 'test.jpg',
        path: 'http://localhost:3000/uploads/test.jpg',
        mimetype: 'image/jpeg',
        user_id: 1,
      });
    });
  });
});