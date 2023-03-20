import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity("User")
@Directive('@key(fields:"id")')
export default class User extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ name: 'user_id' })
  userId: number;

}