import { OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class DatabaseUserDto extends OmitType(CreateUserDto, ['password']) {
  isActive: boolean;
  hash: string;
  salt: string;
}
