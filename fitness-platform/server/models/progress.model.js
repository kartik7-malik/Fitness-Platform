const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Progress must belong to a user']
  },
  date: {
    type: Date,
    default: Date.now
  },
  weight: {
    type: Number
  },
  measurements: {
    chest: Number,
    waist: Number,
    hips: Number,
    arms: Number,
    thighs: Number
  },
  workoutCompleted: {
    type: mongoose.Schema.ObjectId,
    ref: 'WorkoutPlan'
  },
  duration: Number, // in minutes
  caloriesBurned: Number,
  notes: String,
  mood: {
    type: String,
    enum: ['great', 'good', 'okay', 'tired', 'exhausted']
  },
  photos: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for faster queries
progressSchema.index({ user: 1, date: -1 });

// Populate user info when finding progress records
progressSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'workoutCompleted',
    select: 'title difficulty'
  });
  
  next();
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;