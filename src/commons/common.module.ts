import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { LocalFileRepository } from '../repository/localfile.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [CommonService, LocalFileRepository],
  controllers: [CommonController],
  exports: [CommonService],
})
export class CommonModule {}
