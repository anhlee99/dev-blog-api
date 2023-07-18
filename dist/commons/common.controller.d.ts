/// <reference types="multer" />
import { CommonService } from './common.service';
import { ConfigService } from '@nestjs/config';
export declare class CommonController {
    private configService;
    private commonService;
    constructor(configService: ConfigService, commonService: CommonService);
    uploadFile(req: any, files: Express.Multer.File[]): Promise<{
        result: import("../entitys/localfile.entity").LocalFileEntity[];
        message: string;
    }>;
    uploadFiles(files: Array<Express.Multer.File>): void;
}
