import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseUserDto } from './dto/database-user.dto';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<DatabaseUserDto | Error> {
    try {
      const salt = await bcrypt.genSalt();
      const id = randomUUID();
      const { password, email } = createUserDto;
      const hash = await bcrypt.hash(password, salt);
      const user: DatabaseUserDto = { id, email, hash, salt, isActive: true };
      const createdUser = this.usersRepository.create(user);

      const savedUser = await this.usersRepository.save(createdUser);

      return savedUser;
    } catch (err) {
      return err;
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
