



import { Booking } from 'src/bookings/entities/booking.entity';


import { Field, ID, ObjectType } from '@nestjs/graphql';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;



  @OneToMany(() => Booking, (booking) => booking.task)
  @Field(() => [Booking])
  bookings: Booking[];
}