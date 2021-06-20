import { OmitType } from '@nestjs/swagger';
import { DatabaseUserDto } from './database-user.dto';

export class UserView extends OmitType(DatabaseUserDto, ['hash', 'salt']) {}
