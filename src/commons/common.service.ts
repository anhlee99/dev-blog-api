import { Injectable, Request } from '@nestjs/common';
import { LocalFileRepository } from '../repository/localfile.repository';
import { LocalFileEntity } from '../entitys/localfile.entity';
import { SUCCESSFUL } from '../utils/message.util';
import { Util } from '../utils/util';
import { AppConfig } from '../config/app-config';

@Injectable()
export class CommonService {
  constructor(private localFilesRepository: LocalFileRepository) {}

  async uploadFile(req, userId: number, files: Express.Multer.File[]) {
    const localFileEntities: LocalFileEntity[] = [];
    const baseURL = Util.getFullUrl(req);
    for (const file of files) {
      const newFile = await this.localFilesRepository.create({
        filename: file.originalname,
        path: baseURL + '/' + file.path,
        mimetype: file.mimetype,
        user_id: userId,
      });
      localFileEntities.push(await this.localFilesRepository.save(newFile));
    }
    return {
      result: localFileEntities,
      message: SUCCESSFUL,
    };
  }
}
