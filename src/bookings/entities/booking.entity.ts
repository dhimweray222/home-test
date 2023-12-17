import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Task } from 'src/tasks/entities/task.entity';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,DeleteDateColumn} from 'typeorm';

@Entity()
@ObjectType()
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  title: string;

  @Column({ type:'timestamp with time zone'  })
  @Field()
  booking_date: Date;
  

  @Column('uuid')
  @Field()
  user: string;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deletedAt: Date;

  @ManyToOne(() => Task)
  @JoinColumn()
  @Field(() => Task)
  task: Task;

  
}