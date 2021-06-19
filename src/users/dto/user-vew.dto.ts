import { OmitType } from '@nestjs/mapped-types';
import { DatabaseUserDto } from './database-user.dto';

export class UserView extends OmitType(DatabaseUserDto, ['hash', 'salt']) {}
