
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store'
import type { RedisClientOptions } from 'redis';
const url = 'redis://127.0.0.1:6379';
@Module({
  imports: [TypeOrmModule.forFeature([Task]),
  CacheModule.register<RedisClientOptions>(({
    store: redisStore,
    url:url
  }),)],
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}
