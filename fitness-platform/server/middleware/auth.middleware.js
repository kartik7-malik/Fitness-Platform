// Simple placeholder middleware for authentication
exports.protect = (req, res, next) => {
  // In a real app, this would verify JWT tokens
  req.user = { id: '123', name: 'Test User', role: 'user' };
  next();
};

// Role-based access control
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action'
      });
    }
    next();
  };
};