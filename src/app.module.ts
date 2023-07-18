import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configuration, configurationValidate } from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { UserEntity } from './entitys/user.entity';
import { AccountEntity } from './entitys/account.entity';
import { CommonModule } from './commons/common.module';
import * as Joi from 'joi';
import { AppConfig } from './config/app-config';
import { doc } from 'prettier';
import { join } from 'path';

@Module({
  imports: [
    // load config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object(configurationValidate),
    }),
    // connect database
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('database'),
      }),
      inject: [ConfigService],
    }),
    // base module //
    AuthModule,
    UsersModule,
    CommonModule
  ],
  controllers: [],
  providers: [AppConfig],
})
export class AppModule {}
