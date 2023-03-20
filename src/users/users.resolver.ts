import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import User from './entities/user.entity';
import { CreateUserInput, DeleteUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver  {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createOrLoginUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.createOrLoginUser(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll(@Args('data') data: UpdateUserInput) {
    return this.usersService.findAll(data);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('input') input: DeleteUserInput): Promise<User> {
    return await this.usersService.remove(input);
  }  
}
