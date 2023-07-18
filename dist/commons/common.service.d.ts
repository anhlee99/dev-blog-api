/// <reference types="multer" />
import { LocalFileRepository } from '../repository/localfile.repository';
import { LocalFileEntity } from '../entitys/localfile.entity';
export declare class CommonService {
    private localFilesRepository;
    constructor(localFilesRepository: LocalFileRepository);
    uploadFile(req: any, userId: number, files: Express.Multer.File[]): Promise<{
        result: LocalFileEntity[];
        message: string;
    }>;
}
