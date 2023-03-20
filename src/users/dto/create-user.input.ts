import { InputType, Field, PickType } from '@nestjs/graphql';
import User from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(
  User,
  ['email', 'userId'] as const,
  InputType
) {}

@InputType()
export class DeleteUserInput {
  @Field()
  readonly id: number;

  @Field()
  readonly userId: number;
}