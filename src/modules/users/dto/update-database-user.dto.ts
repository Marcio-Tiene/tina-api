import { OmitType, PartialType } from '@nestjs/swagger';
import { DatabaseUserDto } from './database-user.dto';

export class UpdateDatabaseUserDto extends OmitType(
  PartialType(DatabaseUserDto),
  ['id'],
) {}
