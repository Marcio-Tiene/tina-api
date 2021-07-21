import { ForbiddenException, HttpCode, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseUserDto } from './dto/database-user.dto';
import { DeleteResult, MongoRepository } from 'typeorm';

import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserView } from './dto/user-view.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: MongoRepository<Users>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserView | Error> {
    try {
      const salt = await bcrypt.genSalt();

      const { password, email } = createUserDto;
      const hash = await bcrypt.hash(password, salt);
      const user: DatabaseUserDto = {
        email,
        hash,
        salt,
        isActive: true,
      };
      const createdUser = this.usersRepository.create(user);

      const savedUser = await this.usersRepository.save(createdUser);

      return this.userView(savedUser);
    } catch (err) {
      return err.message;
    }
  }

  async findAll(): Promise<UserView[] | Error> {
    try {
      const users = await this.usersRepository.find();

      return this.usersView(users);
    } catch (err) {
      return err;
    }
  }

  async findOne(_id: string): Promise<UserView | Error> {
    try {
      const user = await this.usersRepository.findOneOrFail(_id);

      return this.userView(user);
    } catch (err) {
      return err;
    }
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<UserView> {
    try {
      if (updateUserDto.password)
        throw new ForbiddenException(
          'Password cannot be changed at this route',
        );

      const user = await this.usersRepository.findOneOrFail(_id);
      const updatedUser = await this.usersRepository.save({
        ...user,
        ...updateUserDto,
      });

      return this.userView(updatedUser);
    } catch (err) {
      return err;
    }
  }

  async remove(_id: string): Promise<UserView | Error> {
    try {
      const user = await this.usersRepository.findOneOrFail(_id);
      await this.usersRepository.delete(user);
      return this.userView(user);
    } catch (err) {
      throw err;
    }
  }

  userView(user: DatabaseUserDto): UserView {
    const { hash, salt, ...view } = user;

    return view;
  }
  usersView(users: DatabaseUserDto[]): UserView[] {
    const usersView = users.map((user): UserView => {
      return this.userView(user);
    });
    return usersView;
  }
}
