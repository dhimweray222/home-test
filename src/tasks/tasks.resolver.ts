
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';

import {Args,Mutation,Parent,Query,ResolveField, Resolver} from '@nestjs/graphql';
import { Booking } from '../bookings/entities/booking.entity';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Task])
  tasks() {
    return this.tasksService.findAll();
  }

  @Mutation(() => Task)
  createTask(@Args('name') name: string) {
    return this.tasksService.create(name);
  }

  @ResolveField(() => [Booking])
  bookings(@Parent() task: Task) {
    return this.tasksService.taskBookings(task.id);
  }
}
