import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Task } from './entities/task.entity';
import { Inject,Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Cache} from 'cache-manager'



@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache
  ) {}

  create(name: string) {
    const author = this.tasksRepository.create({ name, bookings: [] });
    return this.tasksRepository.save(author);
  }

  // async findAll(): Promise<Post[]> {
  //   const post= await this.postsRepository.find();
 
  //    await this.cacheManager.store.set('s',{posts:post});
  //    const item = await this.cacheManager.store.get('s')
  //    console.log(this.cacheManager)
  //    console.log(item)
  //    return post
  //  }


  async findAll():Promise<Task[]> { 

    
    const fromRedis = await this.cacheManager.store.get('tasks')
    if (fromRedis !== null) {
      const data = JSON.parse(fromRedis);
      console.log('Data from redis :', data);
      return data

    } else {
      const tasks = await this.tasksRepository.find();
      const item = JSON.stringify(tasks);
      await this.cacheManager.store.set('tasks',item);
      console.log('Data from DB : ', tasks);
      return tasks

    }
   
  }

  async taskBookings(authorId: string) {
    const author = await this.tasksRepository.findOne({
      where: { id: authorId },
      relations: { bookings: true },
    });

    return author.bookings;
  }
}
