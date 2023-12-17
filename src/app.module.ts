
import { BookingsModule } from './bookings/bookings.module';
import { TasksModule } from './tasks/tasks.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';




import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    BookingsModule,
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres', // Use 'mysql' for MySQL
      host: 'localhost',
      port: 5432, // Default port
      username: 'postgres',
      password: 'dimasslalu123',
      database: 'home_test',
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true, // Set to false in production
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}