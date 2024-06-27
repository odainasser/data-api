# NestJS Application

This is a NestJS application that provides a RESTful API for managing ingest and retrieve data. This README provides instructions on setting up and running the application locally and using Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (>= 14)
- npm (comes with Node.js)
- Docker (optional, for running with Docker)
- Docker Compose (optional, for running with Docker)

## Installation

1. Install dependencies:

  ```bash
   npm install

2. Create a .env file in the root directory and add your environment variables:
  
  DATABASE_HOST=localhost
  DATABASE_PORT=5432
  DATABASE_USER=your_db_user
  DATABASE_PASSWORD=your_db_password
  DATABASE_NAME=your_db_name  

3. Start the application:

  ```bash
   npm run start:dev

   or 

  ```bash
   docker-compose up --build