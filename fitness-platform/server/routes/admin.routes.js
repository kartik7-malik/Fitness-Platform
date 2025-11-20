const express = require('express');
const adminController = require('../controllers/admin.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Protect all routes and restrict to admin
router.use(authController.protect);
router.use(authController.restrictTo('admin'));

// Admin routes
router.route('/users')
  .get(adminController.getAllUsers)
  .post(adminController.createUser);

router.route('/users/:id')
  .get(adminController.getUser)
  .patch(adminController.updateUser)
  .delete(adminController.deleteUser);

router.get('/workouts/pending', adminController.getPendingWorkouts);
router.get('/stats', adminController.getSystemStats);

module.exports = router;