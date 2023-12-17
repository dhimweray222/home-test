


import {Args,Mutation,Parent,Query,ResolveField, Resolver} from '@nestjs/graphql';
import { Task } from '../tasks/entities/task.entity';
import { Booking } from './entities/booking.entity';
import { BookingsService } from './bookings.service';

@Resolver(() => Booking)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @Query(() => [Booking]) // Return an array of posts
  async bookings(): Promise<Booking[]> {
    const bookings = await this.bookingsService.findAll();
    return bookings;
  }
  @Query(() => [Booking], { name: 'bookingsByTaskId' })
  async findAllByTask(@Args('taskId') taskId: string): Promise<Booking[]> {
    return this.bookingsService.findAllByTask(taskId);
  }

  @Query(() => [Booking], { name: 'bookingsByUser' })
  async findAllByUser(@Args('user') user: string): Promise<Booking[]> {
    return this.bookingsService.findAllByTask(user);
  }

  @Mutation(() => Booking)
  createBooking(@Args('title') title: string, @Args('taskId') taskId: string,@Args('user') user: string, @Args('booking_date') booking_date: string) {
    const parsedBookingDate = new Date(booking_date);
       // Check if the booking_date is in the future
   if (parsedBookingDate < new Date()) {
    throw new Error('Booking date must be in the future');
  }
    return this.bookingsService.createBooking(title, taskId,parsedBookingDate, user);
  }

  @Mutation(()=>Booking)
  async cancelBooking(@Args('bookingId') bookingId: string) {
    // Check if the booking exists and is not already canceled
    const existingBooking = await this.bookingsService.findOneById(bookingId);
    if (!existingBooking) {
      throw new Error('Booking not found');
    }

    // Cancel the booking (soft delete)
    this.bookingsService.cancelBooking(bookingId);
    return existingBooking
  }


  @ResolveField(() => [Task])
  task(@Parent() booking: Booking) {
    return this.bookingsService.bookingTask(booking.id);
  }
}
