import {
  BadRequestException,
  Controller,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CommonService } from './common.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import LocalFilesInterceptor from '../config/web/interceptor/localfile.web.interceptor';
import { ParseFile } from './pipe/parse-file.pipe';
import { TransformWebInterceptor } from '../config/web/interceptor/transform.web.interceptor';
import { ConfigService } from '@nestjs/config';
import { UPLOADED_FILES_FILE_LIMIT_SIZE } from '../utils/constants.ultis';

@Controller('common')
export class CommonController {
  constructor(
    private configService: ConfigService,
    private commonService: CommonService,
  ) {}

  @Post('upload-image')
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformWebInterceptor)
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'images',
      path: '/images',
      fileFilter: (request, files, callback) => {
        if (!files.mimetype.includes('image')) {
          return callback(
            new BadRequestException('Provide a valid image'),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: Math.pow(UPLOADED_FILES_FILE_LIMIT_SIZE, 2), // default 3MB
      },
    }),
  )
  uploadFile(
    @Request() req,
    @UploadedFiles(ParseFile) files: Express.Multer.File[],
  ) {
    return this.commonService.uploadFile(req, req.user.user_id, files);
  }

  @Post('uploads')
  uploadFiles(@UploadedFiles(ParseFile) files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
