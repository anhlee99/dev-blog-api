import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entitys/account.entity';
import { LocalFileEntity } from '../entitys/localfile.entity';

@Injectable()
export class LocalFileRepository extends Repository<LocalFileEntity> {
  constructor(private dataSource: DataSource) {
    super(LocalFileEntity, dataSource.createEntityManager());
  }
}