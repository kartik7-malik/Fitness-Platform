const WorkoutPlan = require('../models/workout.model');

// Get all workout plans
exports.getAllWorkouts = async (req, res) => {
  try {
    // Build query
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    
    // Filter by approved status for regular users
    if (req.user.role === 'user') {
      queryObj.approved = true;
    }
    
    // Filter by creator for trainers
    if (req.user.role === 'trainer') {
      queryObj.creator = req.user.id;
    }
    
    // Advanced filtering
    let query = WorkoutPlan.find(queryObj);
    
    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    
    query = query.skip(skip).limit(limit);
    
    // Execute query
    const workouts = await query;
    
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

// Get single workout plan
exports.getWorkout = async (req, res) => {
  try {
    const workout = await WorkoutPlan.findById(req.params.id);
    
    if (!workout) {
      return res.status(404).json({
        status: 'fail',
        message: 'No workout found with that ID'
      });
    }
    
    // Check if user has access to this workout
    if (req.user.role === 'user' && !workout.approved) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to view this workout'
      });
    }
    
    // Check if trainer has access to this workout
    if (req.user.role === 'trainer' && workout.creator.id !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to view this workout'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        workout
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Create new workout plan
exports.createWorkout = async (req, res) => {
  try {
    // Only trainers can create workouts
    if (req.user.role !== 'trainer' && req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'fail',
        message: 'Only trainers can create workout plans'
      });
    }
    
    // Set creator to current user
    req.body.creator = req.user.id;
    
    // Auto-approve if admin
    if (req.user.role === 'admin') {
      req.body.approved = true;
      req.body.approvedBy = req.user.id;
    }
    
    const newWorkout = await WorkoutPlan.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        workout: newWorkout
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update workout plan
exports.updateWorkout = async (req, res) => {
  try {
    const workout = await WorkoutPlan.findById(req.params.id);
    
    if (!workout) {
      return res.status(404).json({
        status: 'fail',
        message: 'No workout found with that ID'
      });
    }
    
    // Check if user has permission to update
    if (req.user.role === 'trainer' && workout.creator.id !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to update this workout'
      });
    }
    
    // Prevent changing creator
    delete req.body.creator;
    
    // Only admin can change approval status
    if (req.user.role !== 'admin') {
      delete req.body.approved;
      delete req.body.approvedBy;
    } else if (req.body.approved) {
      req.body.approvedBy = req.user.id;
    }
    
    const updatedWorkout = await WorkoutPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      status: 'success',
      data: {
        workout: updatedWorkout
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete workout plan
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await WorkoutPlan.findById(req.params.id);
    
    if (!workout) {
      return res.status(404).json({
        status: 'fail',
        message: 'No workout found with that ID'
      });
    }
    
    // Check if user has permission to delete
    if (req.user.role === 'trainer' && workout.creator.id !== req.user.id) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to delete this workout'
      });
    }
    
    await WorkoutPlan.findByIdAndDelete(req.params.id);
    
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

// Approve workout plan (admin only)
exports.approveWorkout = async (req, res) => {
  try {
    const workout = await WorkoutPlan.findById(req.params.id);
    
    if (!workout) {
      return res.status(404).json({
        status: 'fail',
        message: 'No workout found with that ID'
      });
    }
    
    workout.approved = true;
    workout.approvedBy = req.user.id;
    await workout.save();
    
    res.status(200).json({
      status: 'success',
      data: {
        workout
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};