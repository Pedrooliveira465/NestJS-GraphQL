import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import User from './users/entities/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
    ]),
  ],
  providers: [RepoService],
  exports: [RepoService],
})
class RepoModule {}
export default RepoModule;