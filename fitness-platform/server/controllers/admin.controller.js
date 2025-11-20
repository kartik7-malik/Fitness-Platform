const User = require('../models/user.model');
const WorkoutPlan = require('../models/workout.model');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Create user
exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get pending workout approvals
exports.getPendingWorkouts = async (req, res) => {
  try {
    const workouts = await WorkoutPlan.find({ approved: false });
    
    res.status(200).json({
      status: 'success',
      results: workouts.length,
      data: {
        workouts
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get system statistics
exports.getSystemStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const trainerCount = await User.countDocuments({ role: 'trainer' });
    const workoutCount = await WorkoutPlan.countDocuments();
    const pendingWorkoutCount = await WorkoutPlan.countDocuments({ approved: false });
    
    res.status(200).json({
      status: 'success',
      data: {
        userCount,
        trainerCount,
        workoutCount,
        pendingWorkoutCount
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};