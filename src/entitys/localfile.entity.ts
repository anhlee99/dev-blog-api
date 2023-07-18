import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as moment from 'moment';
import { DATE_FORMAT } from '../utils/constants.ultis';

@Entity('m_local_file')
export class LocalFileEntity {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  public id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date(moment().format(DATE_FORMAT));
  }
}

