import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  hash: string;

  @Column()
  salt: string;

  @Column({ default: true })
  isActive: boolean;
}
