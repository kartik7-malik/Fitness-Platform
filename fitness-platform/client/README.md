# Fitness Platform Frontend

This directory contains the React frontend for the Online Fitness Training Platform.

## Structure

- `public/` - Static files and assets
- `src/` - React source code
  - `components/` - Reusable UI components
  - `context/` - React context for state management
  - `pages/` - Page components for different routes
  - `services/` - API service functions

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Build for production:
   ```
   npm run build
   ```

## Features

### Authentication

- User registration and login
- JWT-based authentication
- Role-based access control

### User Dashboard

- View fitness progress
- Browse workout plans
- Track completed workouts
- Update profile information

### Trainer Dashboard

- Create and manage workout plans
- Monitor client progress
- View client statistics
- Manage training programs

### Admin Dashboard

- User management
- Workout approval
- System statistics
- Performance monitoring

## Technologies Used

- React.js for UI components
- React Router for navigation
- Context API for state management
- Axios for API requests
- Chart.js for data visualization
- Tailwind CSS for styling
- Formik and Yup for form validation