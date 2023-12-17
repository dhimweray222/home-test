
import { BookingsService } from './bookings.service';
import { BookingsResolver } from './bookings.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store'
import type { RedisClientOptions } from 'redis';

const url = 'redis://127.0.0.1:6379';
@Module({
  imports: [TypeOrmModule.forFeature([Booking]),
  CacheModule.register<RedisClientOptions>(({
    store: redisStore,
    url:url
  }),)],
  providers: [BookingsResolver, BookingsService],
})
export class BookingsModule {}