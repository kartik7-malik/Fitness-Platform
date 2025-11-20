const express = require('express');
const progressController = require('../controllers/progress.controller');
const authController = require('../controllers/auth.controller');

const router = express.Router();

// Protect all routes
router.use(authController.protect);

// Progress routes
router.route('/')
  .get(progressController.getUserProgress)
  .post(progressController.createProgress);

router.route('/:id')
  .get(progressController.getProgress)
  .patch(progressController.updateProgress)
  .delete(progressController.deleteProgress);

// Get progress statistics
router.get('/stats', progressController.getProgressStats);

// Get progress for specific user (admin and trainer only)
router.get(
  '/user/:userId',
  authController.restrictTo('admin', 'trainer'),
  progressController.getUserProgress
);

router.get(
  '/user/:userId/stats',
  authController.restrictTo('admin', 'trainer'),
  progressController.getProgressStats
);

module.exports = router;