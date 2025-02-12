import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: { type: String },
  estimatedTime: {
    type: Number,
    required: true,
    min: 0.25,
  }, // in hours
  progress: [
    {
      student: { type: String },
      timeWorked: { type: Number, default: 0 },
      completed: { type: Boolean, default: false },
      notes: String,
      grade: { type: Number, min: 0, max: 100 }  // Optional: Educator grading
    }
  ],
  taskWeight: {
    type: Number,
    required: true,
    default: 1
  }
})

const TaskModel = mongoose.model('tasks', TaskSchema)

export default TaskModel

// Potentially ad due date