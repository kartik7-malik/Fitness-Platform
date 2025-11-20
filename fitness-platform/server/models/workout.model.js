const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A workout plan must have a title'],
    trim: true,
    maxlength: [100, 'A workout plan title must have less than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'A workout plan must have a description'],
    trim: true
  },
  difficulty: {
    type: String,
    required: [true, 'A workout plan must have a difficulty level'],
    enum: {
      values: ['beginner', 'intermediate', 'advanced'],
      message: 'Difficulty must be: beginner, intermediate, or advanced'
    }
  },
  duration: {
    type: Number,
    required: [true, 'A workout plan must have a duration in weeks']
  },
  category: {
    type: String,
    required: [true, 'A workout plan must have a category'],
    enum: {
      values: ['strength', 'cardio', 'flexibility', 'balance', 'full-body', 'custom'],
      message: 'Category must be one of the predefined types'
    }
  },
  exercises: [
    {
      name: {
        type: String,
        required: [true, 'An exercise must have a name']
      },
      description: {
        type: String,
        required: [true, 'An exercise must have a description']
      },
      sets: {
        type: Number,
        default: 3
      },
      reps: {
        type: Number,
        default: 10
      },
      duration: {
        type: Number,
        default: 0 // in seconds, for timed exercises
      },
      restTime: {
        type: Number,
        default: 60 // in seconds
      },
      videoUrl: String,
      imageUrl: String
    }
  ],
  schedule: [
    {
      day: {
        type: Number,
        required: [true, 'A schedule day must be specified'],
        min: 1,
        max: 7
      },
      exercises: [
        {
          exerciseIndex: {
            type: Number,
            required: [true, 'Reference to the exercise in the exercises array is required']
          },
          sets: Number,
          reps: Number,
          duration: Number,
          notes: String
        }
      ],
      restDay: {
        type: Boolean,
        default: false
      }
    }
  ],
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A workout plan must have a creator']
  },
  approved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  ratings: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A rating must have a user']
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'A rating must have a value']
      },
      review: String,
      createdAt: {
        type: Date,
        default: Date.now()
      }
    }
  ]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual property for average rating
workoutPlanSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) return 0;
  
  const sum = this.ratings.reduce((acc, curr) => acc + curr.rating, 0);
  return (sum / this.ratings.length).toFixed(1);
});

// Index for faster queries
workoutPlanSchema.index({ title: 'text', description: 'text' });
workoutPlanSchema.index({ creator: 1, approved: 1 });
workoutPlanSchema.index({ difficulty: 1, category: 1 });

// Populate creator info when finding workout plans
workoutPlanSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'creator',
    select: 'name profilePicture'
  });
  
  next();
});

// Update the updatedAt field on save
workoutPlanSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;