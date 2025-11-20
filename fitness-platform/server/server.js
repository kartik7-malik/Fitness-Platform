require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

// Import routes
const userRoutes = require('./routes/user.routes');
const trainerRoutes = require('./routes/trainer.routes');

// These routes will be added later
// const authRoutes = require('./routes/auth.routes');
// const workoutRoutes = require('./routes/workout.routes');
// const progressRoutes = require('./routes/progress.routes');
// const adminRoutes = require('./routes/admin.routes');

// Initialize express app
const app = express();
const PORT = 6001; // Using port 6001 as requested

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/fitness-platform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// API Routes
// app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// app.use('/api/workouts', workoutRoutes);
// app.use('/api/progress', progressRoutes);
// app.use('/api/admin', adminRoutes);
app.use('/api/trainer', trainerRoutes);

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error',
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;