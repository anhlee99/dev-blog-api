import {
  BaseEntity,
  BeforeInsert, BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import * as moment from 'moment';
import { DATE_FORMAT } from '../utils/constants.ultis';
import { Exclude } from 'class-transformer';

@Entity('t_accounts')
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  user_id: number;

  @Column({ type: 'bigint' })
  account_type: number;

  @Column()
  login_name: string;

  @Column()
  @Exclude() // loại trừ
  password: string;

  @Column()
  salt: string;

  @Column({ type: 'timestamp' })
  reset_password_expired: Date;

  @Column()
  reset_password_key: string;

  @Column({ type: 'bigint' })
  status: number;

  @Column()
  create_user: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @BeforeInsert()
  insertCreated() {
    this.created_at = new Date(moment().format(DATE_FORMAT));
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updated_at = new Date(moment().format(DATE_FORMAT));
  }
}
