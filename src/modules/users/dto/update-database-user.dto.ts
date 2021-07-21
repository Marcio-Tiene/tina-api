import { OmitType, PartialType } from '@nestjs/swagger';
import { DatabaseUserDto } from './database-user.dto';

export class UpdateDatabaseUserDto
  // OmitType(
  extends PartialType(DatabaseUserDto) {
  // ,
  // [''],
  // )
}
