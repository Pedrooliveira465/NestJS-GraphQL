import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoModule from './repo.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule, RepoModule],
})
export class AppModule {}

