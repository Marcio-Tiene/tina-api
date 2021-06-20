import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { DatabaseUserDto } from './dto/database-user.dto';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserView } from './dto/user-view.dto';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserView | Error> {
    try {
      const salt = await bcrypt.genSalt();
      const id = randomUUID();
      const { password, email } = createUserDto;
      const hash = await bcrypt.hash(password, salt);
      const user: DatabaseUserDto = { id, email, hash, salt, isActive: true };
      const createdUser = this.usersRepository.create(user);

      const savedUser = await this.usersRepository.save(createdUser);

      return this.userView(savedUser);
    } catch (err) {
      return err;
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

  async findOne(userId: string): Promise<UserView | Error> {
    try {
      const user = await this.usersRepository.findOneOrFail(userId);

      return this.userView(user);
    } catch (err) {
      return err;
    }
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserView> {
    try {
      if (updateUserDto.password) throw HttpErrorByCode[401];

      const user = await this.usersRepository.findOneOrFail(userId);
      const updatedUser = await this.usersRepository.save({
        ...user,
        ...updateUserDto,
      });

      return this.userView(updatedUser);
    } catch (err) {
      return err;
    }
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
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
