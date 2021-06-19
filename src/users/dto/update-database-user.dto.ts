import { OmitType, PartialType } from '@nestjs/mapped-types';
import { DatabaseUserDto } from './database-user.dto';

export class UpdateDatabaseUserDto extends OmitType(
  PartialType(DatabaseUserDto),
  ['id'],
) {}
