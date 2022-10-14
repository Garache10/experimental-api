import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
