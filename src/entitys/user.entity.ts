import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import * as moment from 'moment/moment';
import { DATE_FORMAT } from '../utils/constants.ultis';

@Entity('t_users')
export class UserEntity extends BaseEntity{

  @PrimaryGeneratedColumn( {type: 'bigint'} )
  id: number;

  @Column({ type: 'bigint' })
  account_id: number;

  @Column()
  email: string;

  @Column()
  fullname: string;

  @Column()
  shortname: string;

  @Column()
  bio: string;

  @Column()
  address: string;

  @Column()
  picture: string;

  @Column()
  phone: string;

  @Column()
  website: string;

  @Column()
  facebook: string;

  @Column()
  twitch: string;

  @Column()
  instagram: string;

  @Column({ default: 1, type: 'bigint' })
  gender: number;

  @Column({ type: 'date' })
  birthday: Date;

  @Column()
  roles: string;

  @Column({
    type: 'jsonb'
  })
  user_setting_data: JSON;

  @Column({ type: 'bigint' })
  status: number;

  @Column()
  create_user: string;

  @CreateDateColumn({ type: 'timestamp' })
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
