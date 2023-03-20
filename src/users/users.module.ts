import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import User from './entities/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import RepoModule from 'src/repo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      username: 'postgres',
      password: 'postgres',
      database: 'myDb',
      autoLoadEntities: true,
      synchronize: false,
    } as TypeOrmModuleOptions),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: true, 
    }),
    RepoModule,
  ],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
