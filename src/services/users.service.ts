import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entitys/user.entity';
// This should be a real class/interface representing a user entity
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async add(user: UserEntity): Promise<void> {
    await this.userRepository.save(user);
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { id: id },
    });
  }

  findOneByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { username: username },
    });
  }

  async modify(user: UserEntity): Promise<void> {
    const userNew = await this.userRepository.findOne({
      where: { id: user.id },
    });
    userNew.active = user.active;
    await this.userRepository.save(userNew);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

}
