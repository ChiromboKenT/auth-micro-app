# Authentication App Monorepo

This monorepo contains a full-stack authentication application with an Express backend and a React frontend.

## Prerequisites

- Docker and Docker Compose
- Git

## Quick Start with Docker

1. Clone the repository:
   ```
   git clone <repository-url>
   cd auth-app-monorepo
   ```

2. Copy the example environment file:
   ```
   cp .env.example .env
   ```

3. Build and run the application using Docker:
   ```
   docker-compose up --build
   ```

4. Visit the application at http://localhost:3000

## Manual Setup (without Docker)

If you prefer to run the application without Docker, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm
- MySQL

### Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd auth-app-monorepo
   ```

2. Install root dependencies:
   ```
   npm install
   ```

3. Set up the backend:
   ```
   cd backend
   npm install
   ```

4. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

5. Create a `.env` file in the backend directory with the following contents:
   ```
   PORT=3000
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=auth_microservice
   JWT_SECRET=your_jwt_secret
   ```
   Replace the placeholder values with your actual database credentials and choose a secure JWT secret.

6. Set up the database:
   - Create a MySQL database named `auth_microservice`
   - Run the SQL migration script located in `backend/src/migrations/001_create_users_table.sql`

## Running the Application (without Docker)

To start both the backend and frontend concurrently:
```
npm start
```

This will start the backend on http://localhost:3000 and the frontend on http://localhost:5173.

To start only the backend:
```
npm run start:backend
```

To start only the frontend:
```
npm run start:frontend
```

## Building the Application

To build both the backend and frontend:
```
npm run build
```

## Running Tests

To run tests for both the backend and frontend:
```
npm test
```

## API Documentation

The API documentation is available via Swagger UI. To access it:

1. Ensure the backend is running (either through Docker or manually)
2. Visit http://localhost:3000/api-docs in your web browser

This will display the Swagger UI, where you can explore and test the API endpoints.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.