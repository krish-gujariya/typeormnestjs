import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm,{ connectionSource } from './datasource/typeorm.module';
import { ProblemsModule } from './problems/problems.module';
import { DiscussionsModule } from './discussions/discussions.module';
import { LikesModule } from './likes/likes.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    // TypeOrmModule.forRootAsync(connectionSource),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    RouterModule.register([
      
    ]),

    UsersModule,

    ProblemsModule,


    DiscussionsModule,

    LikesModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
