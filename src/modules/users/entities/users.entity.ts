import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class Users {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ unique: true })
  email: string;

  @Column()
  hash: string;

  @Column()
  salt: string;

  @Column({ default: true })
  isActive: boolean;

  // constructor(
  //   _id: ObjectID,
  //   email: string,
  //   hash: string,
  //   salt: string,
  //   isActive: boolean,
  // ) {
  //   this._id = _id;
  //   this.email = email;
  //   this.hash = hash;
  //   this.salt = salt;
  //   this.isActive = isActive;
  // }
}
