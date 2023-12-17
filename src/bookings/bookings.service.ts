
import { Injectable,Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly booksRepository: Repository<Booking>,
    @Inject(CACHE_MANAGER) private cacheManager
  ) {}

  createBooking(title: string, taskId: string, booking_date:Date, user:string) {

    const post = this.booksRepository.create({
      title,
      booking_date,
      user,
      task: {
        id: taskId,
      },
    });

    return this.booksRepository.save(post);
  }

  async cancelBooking(bookingId: string): Promise<Booking> {
    // Soft delete by setting the deletedAt field
    await this.booksRepository.softDelete(bookingId);
    return 
  }

  findAllByTask(taskId: string): Promise<Booking[]> {
    return this.booksRepository.find({
      where: {
        task: {
          id: taskId,
        },
      },
    });
  }

  findAllByUser(user: string): Promise<Booking[]> {
    return this.booksRepository.find({
      where: {
        user: user,
      },
    });
  }
  async findOneById(id: string): Promise<Booking | undefined> {
    const uuid = id
    validate(id)
    return this.booksRepository.findOne({ where: { id } });
  }

  async findAll():Promise<Booking[]> { 
    const item = await this.cacheManager.store.get('bookings')
    if(item!=null){
      const data = JSON.parse(item);
      console.log('Data from redis :', data);
      return data
    }else{
      const bookings = await this.booksRepository.find();
      const item = JSON.stringify(bookings);
      await this.cacheManager.store.set('bookings',item);
      console.log("data from db:",bookings)
      return bookings
    }
    
  }
  async bookingTask(taskId: string) {
    const booking = await this.booksRepository.findOne({
      where: {
        id: taskId,
      },
      relations: {
        task: true,
      },
    });

    return booking.task;
  }
}