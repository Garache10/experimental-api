import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.HOST_DB,
      username: process.env.USER_DB,
      password: process.env.PASS_DB,
      database: process.env.NAME_DB,
      port: Number(process.env.PORT_DB || 5432),
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: false,  // never use true on production
      poolSize: 200
    }),
    UsersModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
