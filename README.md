# Your Nest.js Application

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## Description

Briefly describe your Nest.js application. Include its purpose, key features, and any other relevant information.



## Installation
### Prerequisites 

- Node.js (version >= 12)
- npm or yarn
- Your database ( PostgreSQL) installed and running
- Redis server installed and running

### Clone the repository

```bash
git clone https://github.com/yourusername/your-nestjs-app.git
cd home-test
```
### Install dependencies
```bash
npm install
```

### Change Configuration
Open the src/app.module.ts file and locate the TypeOrmModule.forRoot section. Modify the database configuration as needed:
```bash 
TypeOrmModule.forRoot({
      type: 'postgres', // Use 'mysql' for MySQL
      host: 'localhost',
      port: 5432, // Default port
      username: 'postgres',
      password: 'your password',
      database: 'home_test',
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true, // Set to false in production
    }),
```
Open src/bookings and src/tasks, in the module.ts, change url for redis into your url

```bash
const url = 'your url';
```


### Features
- [Features](#features)
  - [Tasks](#tasks)
    - [1. Create Task](#1-create-task)
    - [2. Get All Tasks](#2-get-all-tasks)
    - [3. Get All Tasks with Bookings](#3-get-all-tasks-with-bookings)
  - [Bookings](#bookings)
    - [1. Create Booking](#1-create-booking)
    - [2. Get Booking by Task](#2-get-booking-by-task)
    - [3. Get All Bookings](#3-get-all-bookings)
    - [4. Get All Bookings by User](#4-get-all-bookings-by-user)
    - [5. Cancel Booking](#5-cancel-booking)
