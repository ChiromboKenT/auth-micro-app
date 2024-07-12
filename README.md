# Authentication App Monorepo

This monorepo contains a full-stack authentication application with an Express backend and a React frontend.

## Prerequisites

- Node.js (v14 or later)
- npm
- MySQL

## Setup

1. Clone the repository:

`   git clone <repository-url>
   cd auth-app-monorepo`


2. Install root dependencies:

`   npm install
   `

3. Set up the backend:
`
   cd backend
   npm install`


4. Set up the frontend:

`   cd ../frontend
   npm install`


5. Create a .env file in the backend directory with the following contents:

   PORT=3000
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=auth_microservice
   JWT_SECRET=your_jwt_secret

   Replace the placeholder values with your actual database credentials and choose a secure JWT secret.

6. Set up the database:
   - Create a MySQL database named auth_microservice
   - Run the SQL migration script located in backend/src/migrations/001_create_users_table.sql

## Running the Application

To start both the backend and frontend concurrently:

`
npm start`


This will start the backend on http://localhost:3000 and the frontend on http://localhost:5173.

To start only the backend:

`
npm run start:backend`


To start only the frontend:


`npm run start:frontend`


## Building the Application

To build both the backend and frontend:


`npm run build`


## Running Tests

To run tests for both the backend and frontend:

`
npm test`


## API Documentation

Once the backend is running, you can access the Swagger API documentation at http://localhost:3000/api-docs.