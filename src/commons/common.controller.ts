import {
  BadRequestException,
  Controller,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommonService } from './common.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import LocalFilesInterceptor from '../config/web/interceptor/localfile.web.interceptor';
import { ParseFile } from './pipe/parse-file.pipe';
import { TransformWebInterceptor } from '../config/web/interceptor/transform.web.interceptor';
import { ConfigService } from '@nestjs/config';
import {
  UPLOADED_FILES_FILE_LIMIT_SIZE,
  ALLOWED_IMAGE_TYPES,
  MAX_FILES_PER_UPLOAD,
} from '../utils/constants.ultis';

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
        if (!ALLOWED_IMAGE_TYPES.includes(files.mimetype)) {
          return callback(
            new BadRequestException(
              `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(
                ', ',
              )}`,
            ),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: UPLOADED_FILES_FILE_LIMIT_SIZE * 1024, // Convert KB to bytes
        files: MAX_FILES_PER_UPLOAD,
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
  @UseGuards(AuthGuard)
  @UseInterceptors(TransformWebInterceptor)
  uploadFiles(
    @Request() req,
    @UploadedFiles(ParseFile) files: Array<Express.Multer.File>,
  ) {
    return this.commonService.uploadFile(req, req.user.user_id, files);
  }
}
