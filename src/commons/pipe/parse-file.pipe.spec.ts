import { BadRequestException } from '@nestjs/common';
import { ParseFile } from './parse-file.pipe';

describe('ParseFile', () => {
  let pipe: ParseFile;

  beforeEach(() => {
    pipe = new ParseFile();
  });

  it('should be defined', () => {
    expect(pipe).toBeDefined();
  });

  it('should return files when valid files are provided', () => {
    const mockFile = {
      fieldname: 'images',
      originalname: 'test.jpg',
      mimetype: 'image/jpeg',
    } as Express.Multer.File;

    const result = pipe.transform(mockFile, null);
    expect(result).toBe(mockFile);
  });

  it('should return array of files when valid files array is provided', () => {
    const mockFiles = [
      {
        fieldname: 'images',
        originalname: 'test1.jpg',
        mimetype: 'image/jpeg',
      },
      {
        fieldname: 'images',
        originalname: 'test2.jpg',
        mimetype: 'image/jpeg',
      },
    ] as Express.Multer.File[];

    const result = pipe.transform(mockFiles, null);
    expect(result).toBe(mockFiles);
  });

  it('should throw BadRequestException when files is undefined', () => {
    expect(() => {
      pipe.transform(undefined, null);
    }).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when files is null', () => {
    expect(() => {
      pipe.transform(null, null);
    }).toThrow(BadRequestException);
  });

  it('should throw BadRequestException when files array is empty', () => {
    expect(() => {
      pipe.transform([], null);
    }).toThrow(BadRequestException);
  });
});