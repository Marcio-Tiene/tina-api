import { OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class DatabaseUserDto extends OmitType(CreateUserDto, ['password']) {
  id: string;
  isActive: boolean;
  hash: string;
  salt: string;
}
