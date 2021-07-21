import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiHeader,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserView } from './dto/user-view.dto';
import * as dotenv from 'dotenv';
import { NotFoundError } from 'rxjs';
import { Response } from 'express';

dotenv.config();

const name = process.env.API_HEADER_NAME;

@ApiTags('users')
@Controller('users')
@ApiHeader({
  name,
  description: 'Secret Key',
  required: true,
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({ type: UserView })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ type: [UserView] })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async findAll() {
    // fetch('https://api.trumail.io/v2/lookups/json?email=marciorft@yahoo.com.br')
    //   .then((res) => res.json())
    //   .then(console.log);

    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserView })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findOne(@Param('id') _id: string) {
    return this.usersService.findOne(_id);
  }

  @Patch(':id')
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param('id') id: string) {
    try {
      return await this.usersService.remove(id);
    } catch (err) {
      res.status(404).send(err.message);
    }
  }
}
