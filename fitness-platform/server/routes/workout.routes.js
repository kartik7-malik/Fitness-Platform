const express = require('express');
const workoutController = require('../controllers/workout.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Protect all routes
router.use(authController.protect);

// Workout routes
router.route('/')
  .get(workoutController.getAllWorkouts)
  .post(
    authController.restrictTo('trainer', 'admin'),
    workoutController.createWorkout
  );

router.route('/:id')
  .get(workoutController.getWorkout)
  .patch(
    authController.restrictTo('trainer', 'admin'),
    workoutController.updateWorkout
  )
  .delete(
    authController.restrictTo('trainer', 'admin'),
    workoutController.deleteWorkout
  );

// Admin only route for approving workouts
router.patch(
  '/:id/approve',
  authController.restrictTo('admin'),
  workoutController.approveWorkout
);

module.exports = router;