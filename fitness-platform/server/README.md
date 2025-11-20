# Fitness Platform Backend

This directory contains the Node.js/Express backend for the Online Fitness Training Platform.

## Structure

- `config/` - Configuration files for database connection and environment variables
- `controllers/` - Request handlers for different resources
- `middleware/` - Custom middleware for authentication and error handling
- `models/` - Mongoose models for database schema
- `routes/` - API route definitions
- `utils/` - Utility functions and helpers
- `server.js` - Main application entry point

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   DATABASE=mongodb://localhost:27017/fitness-platform
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=90d
   JWT_COOKIE_EXPIRES_IN=90
   ```

3. Start the server:
   ```
   npm start
   ```
   
   Or with nodemon for development:
   ```
   npm run dev
   ```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
  - Body: `{ name, email, password, passwordConfirm, role }`
  
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  
- `GET /api/auth/me` - Get current user profile
  - Headers: `Authorization: Bearer <token>`

### Workout Endpoints

- `GET /api/workouts` - Get all workouts
  - Query parameters: `sort`, `page`, `limit`, `fields`
  
- `GET /api/workouts/:id` - Get workout by ID
  
- `POST /api/workouts` - Create new workout (trainer only)
  - Body: `{ title, description, exercises, duration, difficulty, targetMuscleGroups }`
  
- `PATCH /api/workouts/:id` - Update workout (trainer only)
  
- `DELETE /api/workouts/:id` - Delete workout (trainer only)
  
- `PATCH /api/workouts/:id/approve` - Approve workout (admin only)

### Progress Endpoints

- `GET /api/progress` - Get user progress
  - Query parameters: `user`, `startDate`, `endDate`
  
- `POST /api/progress` - Create progress entry
  - Body: `{ weight, measurements, completedWorkouts, duration, caloriesBurned, notes, mood, photos }`
  
- `GET /api/progress/:id` - Get progress entry by ID
  
- `PATCH /api/progress/:id` - Update progress entry
  
- `DELETE /api/progress/:id` - Delete progress entry
  
- `GET /api/progress/stats` - Get progress statistics
  - Query parameters: `startDate`, `endDate`

### Admin Endpoints

- `GET /api/admin/users` - Get all users (admin only)
  
- `GET /api/admin/users/:id` - Get user by ID (admin only)
  
- `PATCH /api/admin/users/:id` - Update user (admin only)
  
- `DELETE /api/admin/users/:id` - Delete user (admin only)
  
- `GET /api/admin/pending-workouts` - Get pending workout approvals (admin only)
  
- `GET /api/admin/stats` - Get system statistics (admin only)

## Error Handling

The API uses a global error handling middleware that returns standardized error responses:

```json
{
  "status": "error",
  "message": "Error message",
  "stack": "Error stack (development only)"
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Role-Based Access Control

The API implements role-based access control with three roles:
- `user` - Regular user with limited access
- `trainer` - Can create and manage workouts
- `admin` - Full access to all resources