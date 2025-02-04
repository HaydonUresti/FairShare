import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL


export const createNewTask = async (groupId, title, description, estimatedTime, taskWeight) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/groups/${groupId}/task`,
      {
        title,
        description,
        estimatedTime,
        taskWeight
      }
    )
    return response.data
  } catch (error) {
    console.error('Group creation failed: ', error)
    throw error
  }
}

export const getTaskById = async (taskId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/tasks/${taskId}`,
    )
    return response.data
  } catch (error) {
    console.error('Group creation failed: ', error)
    throw error
  }
}

export const updateTask = async (taskId, updateData) => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/tasks/${taskId}`,
      {
        updateData
      }
    )
    if (!response.status === 200) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update the task');
    }
    return response.data
  } catch (error) {
    console.error('Group creation failed: ', error)
    throw error
  }
}