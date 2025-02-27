import mongoose from 'mongoose'

const SummarySchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: false,
  },
  studentId: {
    type: String,
    required: false,
  },
  summary: {
    type: String,
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
})

const Summary = mongoose.model('summary', SummarySchema)
export default Summary