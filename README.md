# Online Fitness Training Platform

A comprehensive web application for fitness training, workout planning, and progress tracking.

## Overview

The Online Fitness Training Platform connects users with professional trainers to access personalized workout plans and track fitness progress. The platform serves three user types: Admin, Trainer, and User, each with specific functionalities and dashboards.

## Features

### Admin Features
- User Management (add, edit, delete users)
- Trainer Approval
- Workout Plan Approval
- System Statistics Dashboard

### Trainer Features
- Workout Plan Creation
- Client Progress Monitoring
- Personalized Training Programs
- Performance Analytics

### User Features
- Browse Workout Plans
- Track Fitness Progress
- Set Fitness Goals
- View Performance Statistics

## Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```
fitness-platform/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # React components and logic
│       ├── components/     # Reusable UI components
│       ├── context/        # React context for state management
│       ├── pages/          # Page components for different routes
│       └── services/       # API service functions
├── server/                 # Node.js backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── utils/              # Utility functions
└── docs/                   # Documentation
```

## Installation

1. Clone the repository
2. Run the setup script:
   ```
   ./fitness-platform/setup.sh
   ```
   
   Or manually install dependencies:
   ```
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the server directory with the following variables:
     ```
     PORT=5000
     NODE_ENV=development
     DATABASE=mongodb://localhost:27017/fitness-platform
     JWT_SECRET=your_jwt_secret_key
     JWT_EXPIRES_IN=90d
     JWT_COOKIE_EXPIRES_IN=90
     ```

## Running the Application

1. Start the development server (both frontend and backend):
   ```
   npm run dev
   ```

2. Start only the backend:
   ```
   npm run server
   ```

3. Start only the frontend:
   ```
   npm run client
   ```

## User Roles and Access

- **Admin**: Full access to all features, user management, and system statistics
- **Trainer**: Can create workout plans, monitor client progress, and provide guidance
- **User**: Can browse workouts, track personal progress, and set fitness goals

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Workouts
- `GET /api/workouts` - Get all workouts
- `GET /api/workouts/:id` - Get workout by ID
- `POST /api/workouts` - Create new workout (trainer only)
- `PATCH /api/workouts/:id` - Update workout (trainer only)
- `DELETE /api/workouts/:id` - Delete workout (trainer only)
- `PATCH /api/workouts/:id/approve` - Approve workout (admin only)

### Progress
- `GET /api/progress` - Get user progress
- `POST /api/progress` - Create progress entry
- `GET /api/progress/:id` - Get progress entry by ID
- `PATCH /api/progress/:id` - Update progress entry
- `DELETE /api/progress/:id` - Delete progress entry
- `GET /api/progress/stats` - Get progress statistics

## License

This project is licensed under the MIT License.