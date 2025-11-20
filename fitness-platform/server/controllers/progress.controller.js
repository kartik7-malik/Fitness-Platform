const Progress = require('../models/progress.model');

// Get all progress records for a user
exports.getUserProgress = async (req, res) => {
  try {
    // Get user ID (either from params or current user)
    const userId = req.params.userId || req.user.id;
    
    // Check permissions (only admin, the user themselves, or their trainer can access)
    if (req.user.role !== 'admin' && req.user.id !== userId && req.user.role !== 'trainer') {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to view this user\'s progress'
      });
    }
    
    // Build query
    const queryObj = { user: userId, ...req.query };
    delete queryObj.page;
    delete queryObj.sort;
    delete queryObj.limit;
    
    // Execute query with pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    
    const progress = await Progress.find(queryObj)
      .sort('-date')
      .skip(skip)
      .limit(limit);
    
    res.status(200).json({
      status: 'success',
      results: progress.length,
      data: {
        progress
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Get single progress record
exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    
    if (!progress) {
      return res.status(404).json({
        status: 'fail',
        message: 'No progress record found with that ID'
      });
    }
    
    // Check permissions
    if (req.user.role !== 'admin' && req.user.id !== progress.user.toString() && req.user.role !== 'trainer') {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to view this progress record'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        progress
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Create new progress record
exports.createProgress = async (req, res) => {
  try {
    // Set user to current user if not specified
    if (!req.body.user) {
      req.body.user = req.user.id;
    }
    
    // Check permissions (only admin or the user themselves can create their progress)
    if (req.user.role !== 'admin' && req.user.id !== req.body.user) {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only create progress records for yourself'
      });
    }
    
    const newProgress = await Progress.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        progress: newProgress
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Update progress record
exports.updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    
    if (!progress) {
      return res.status(404).json({
        status: 'fail',
        message: 'No progress record found with that ID'
      });
    }
    
    // Check permissions (only admin or the user themselves can update their progress)
    if (req.user.role !== 'admin' && req.user.id !== progress.user.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only update your own progress records'
      });
    }
    
    // Prevent changing user
    delete req.body.user;
    
    const updatedProgress = await Progress.findByIdAndUpdate(
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
        progress: updatedProgress
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// Delete progress record
exports.deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findById(req.params.id);
    
    if (!progress) {
      return res.status(404).json({
        status: 'fail',
        message: 'No progress record found with that ID'
      });
    }
    
    // Check permissions (only admin or the user themselves can delete their progress)
    if (req.user.role !== 'admin' && req.user.id !== progress.user.toString()) {
      return res.status(403).json({
        status: 'fail',
        message: 'You can only delete your own progress records'
      });
    }
    
    await Progress.findByIdAndDelete(req.params.id);
    
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

// Get progress statistics
exports.getProgressStats = async (req, res) => {
  try {
    // Get user ID (either from params or current user)
    const userId = req.params.userId || req.user.id;
    
    // Check permissions
    if (req.user.role !== 'admin' && req.user.id !== userId && req.user.role !== 'trainer') {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to view this user\'s progress statistics'
      });
    }
    
    // Get date range (default to last 30 days)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    if (req.query.startDate) {
      startDate = new Date(req.query.startDate);
    }
    
    if (req.query.endDate) {
      endDate = new Date(req.query.endDate);
    }
    
    // Get progress records in date range
    const progress = await Progress.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate }
    }).sort('date');
    
    // Calculate statistics
    const weightData = progress.map(p => ({
      date: p.date,
      value: p.weight
    })).filter(p => p.value);
    
    const workoutData = progress.filter(p => p.workoutCompleted).length;
    
    const caloriesData = progress
      .filter(p => p.caloriesBurned)
      .reduce((sum, p) => sum + p.caloriesBurned, 0);
    
    res.status(200).json({
      status: 'success',
      data: {
        weightData,
        workoutData,
        caloriesData,
        totalRecords: progress.length
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};