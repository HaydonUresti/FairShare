import express from 'express'
import * as taskService from '../services/taskService.js'
import TaskModel from '../models/Task.js'

const router = express.Router()

const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.taskId
    if (!taskId) {
      return res.status(400).send({ message: 'taskId is required' })
    }
    const response = await taskService.getTaskDetails(taskId)
    if (!response) {
      return res.status(404).send({ message: `No task found for ID: ${taskId}` })
    }
    res.status(200).send({ task: response })
  } catch (error) {
    res.status(500).send({ message: `Server error: ${error}` })
  }
}

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId
    if (!taskId) {
      return res.status(400).send({ message: 'taskId is required' })
    }
    const updateData = req.body
    if (!updateData) {
      return res.status(400).send({ message: 'data is required to update' })
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      { _id: taskId },
      { $set: updateData },
      { new: true, runValidators: true }
    )
    if (!updatedTask) {
      return res.status(404).send({ message: `No task found with ID: ${taskId}` })
    }

    res.status(200).send(updatedTask)
  } catch (error) {
    res.status(500).send({ message: `Server error: ${error}` })
  }
}


router.get('/:taskId', getTaskById)
router.patch('/:taskId', updateTask)
// PATCH /tasks/:taskId/progress/:studentId → Update a student’s progress on a task (e.g., add a grade)
// GET /tasks?studentId=123 → Get all tasks a student has worked on (cross-group)

export default router
