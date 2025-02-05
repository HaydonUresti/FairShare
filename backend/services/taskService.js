import TaskModel from '../models/Task.js'


export const createTaskDocument = async ({ title, description, estimatedTime, taskWeight }) => {
  try {
    const missingFields = []
    if (!title) missingFields.push('title')
    if (!description) missingFields.push('description')
    if (!estimatedTime) missingFields.push('estimatedTime')
    if (!taskWeight) missingFields.push('taskWeight')

    if (missingFields.length > 0) {
      throw new Error(`All fields are required. Missing fields: ${missingFields.join(', ')}`)
    }

    const response = await TaskModel.create({
      title,
      description,
      estimatedTime,
      taskWeight
    })

    if (!response) {
      throw new Error('Could not create new task')
    }

    return response
  } catch (error) {
    throw new Error(`Error creating new task: ${error.message}`)
  }
}


export const getTaskDetails = async (taskId) => {
  return await TaskModel.findById(taskId)
} 