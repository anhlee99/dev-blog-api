import { DataSource, Repository } from 'typeorm';
import { LocalFileEntity } from '../entitys/localfile.entity';
export declare class LocalFileRepository extends Repository<LocalFileEntity> {
    private dataSource;
    constructor(dataSource: DataSource);
}
