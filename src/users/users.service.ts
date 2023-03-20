import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, DeleteUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async createOrLoginUser(input: CreateUserInput): Promise<User> {
    let user = await this.userRepository.findOne({
      where: { email: input.email.toLowerCase().trim() },
    });

    if (!user) {
      user = this.userRepository.create({
        email: input.email.toLowerCase().trim(),
        userId: input.userId,
      });

     await this.userRepository.save(user);
  }
  return user;
}

  async findAll(data: UpdateUserInput): Promise<User[]> {
    const user = await this.userRepository.findOne({ 
      where: { id: data.id } 
    });

    if (!user || user.userId !== data.userId) {
      throw new Error(
        'User does not exist or you are not logged in',
      );
    }
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = id;

    if (!user) {
      throw new Error(
        'User does not exist or you are not logged in',
      );
    }

    return await this.userRepository.findOneById(id);
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id: updateUserInput.id } 
    });

    if (!user || user.userId !== updateUserInput.userId) {
      throw new Error(
        'User does not exist or you are not logged in',
      );
    }

    return await this.userRepository.update(id, updateUserInput).then(() => this.findOne(id));
  }

  async remove(input: DeleteUserInput): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id: input.id } 
    });

    if (!user || user.userId !== input.userId) {
      throw new Error(
        'User does not exist or you are not logged in',
      );
    }

    await this.userRepository.remove(user);

    return user;

  }
}
