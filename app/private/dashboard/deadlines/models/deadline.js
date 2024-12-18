import mongoose from 'mongoose';

const deadlineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: ['application', 'visa', 'scholarship'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  progress: {
    type: Number,
    required: true,
    min: [0, 'Progress cannot be less than 0'],
    max: [100, 'Progress cannot be more than 100'],
    default: 0
  },
  status: {
    type: String,
    required: true,
    enum: ['upcoming', 'urgent', 'completed'],
    default: 'upcoming'
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

deadlineSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Deadline || mongoose.model('Deadline', deadlineSchema); 