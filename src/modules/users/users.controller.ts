import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
    return await this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserView })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
