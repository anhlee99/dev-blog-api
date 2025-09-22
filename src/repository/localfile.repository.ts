import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { LocalFileEntity } from '../entitys/localfile.entity';

@Injectable()
export class LocalFileRepository extends Repository<LocalFileEntity> {
  constructor(private dataSource: DataSource) {
    super(LocalFileEntity, dataSource.createEntityManager());
  }
}
