import axios from 'axios'
import { getUserById } from './userService'


const API_URL = process.env.REACT_APP_API_URL

export const createGroup = async (groupName, description, joinCode) => {
  try {
    const userId = localStorage.getItem('userId')
    const response = await axios.post(
      `${API_URL}/api/groups/${userId}/createGroup`,
      {
        groupName,
        description,
        userId,
        joinCode
      }
    )
    return response.data
  } catch (error) {
    console.error('Group creation failed: ', error)
    throw error
  }
}

// Gets the groups that a specific educator is the owner of.
export const getEducatorGroups = async () => {
  const userId = localStorage.getItem('userId')
  try {
    const response = await axios.get(`${API_URL}/api/groups/${userId}/groups`)
    console.log(`Educator groups: ${JSON.stringify(response, null, 2)}`)
    return response
  } catch (error) {
    console.error('Error fetching educator groups: ', error)
    throw error
  }
}

// This is for the student to join a group. The student's id comes
// from the local storage.
export const addGroupMember = async (joinCode) => {
  const userId = localStorage.getItem('userId')
  try {
    const response = await axios.patch(
      `${API_URL}/api/groups/${joinCode}/members`,
      {
        userId
      }
    )
    console.log(`Group member added: ${JSON.stringify(response, null, 2)}`)
    return response
  } catch (error) {
    console.error('Error adding group member: ', error)
    throw error
  }
}

export const getGroupMembers = async (groupId) => {
  try {
    const response = await axios.get(`${API_URL}/api/groups/${groupId}/members`)
    console.log(`Group members: ${JSON.stringify(response, null, 2)}`)
    return response
  } catch (error) {
    console.error('Error fetching group members: ', error)
    throw error
  }
}

export const removeGroupMember = async (groupId, userId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/groups/${groupId}/members/${userId}`
    )
    console.log(`Group member removed: ${JSON.stringify(response, null, 2)}`)
    return response
  } catch (error) {
    console.error('Error removing group member: ', error)
    throw error
  }
}

export const deleteGroup = async (groupId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/groups/${groupId}`)
    console.log(`Group deleted: ${JSON.stringify(response, null, 2)}`)
    return response
  } catch (error) {
    console.error('Error deleting group: ', error)
    throw error
  }
}

// get all the groups that a student is a member of 
export const getStudentGroups = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/groups/getGroups?userId=${userId}`)
    return response
  } catch (error) {
    console.log('Error retrieving student groups from API: ', error)
    throw error
  }
}

export const getGroupProgress = async (groupId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/groups/${groupId}/task`,
    )
    return response.data
  } catch (error) {
    console.error('Group creation failed: ', error)
    throw error
  }
}


export const getGroupTasks = async (groupId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/groups/${groupId}/tasks`,
    )
    return response.data
  } catch (error) {
    console.error('Group creation failed: ', error)
    throw error
  }
}

export const getGroupById = async (groupId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/groups/${groupId}`
    )
    return response.data
  } catch (error) {
    console.error('Group creation failed: ', error)
    throw error
  }
}

const findTasksAssinged = (tasks, memberId) => {
  return tasks.filter((task) => task?.task?.progress?.[0]?.student === memberId)
}

const findTasksCompleted = (assignedTasks) => {
  return assignedTasks.filter((task) => task?.task?.progress?.[0]?.completed)
}

const findTimeWorked = (assignedTasks) => {
  return assignedTasks.reduce(
    (total, task) => total + Number(task?.task?.progress?.[0]?.timeWorked || 0),
    0
  )
}

// gets total value of task weight for a user 
const findTotalTaskWeight = (assignedTasks) => {
  return assignedTasks.reduce((total, task) => total + task?.task?.taskWeight || 0),
    0
}

export const getGroupMemberContributions = async (tasks, groupMembers) => {
  const groupMemberData = []

  for (const memberId of groupMembers) {
    const memberTaskData = {}

    const assignedTasks = findTasksAssinged(tasks, memberId)
    memberTaskData.id = memberId
    const studentData = await getUserById(memberId)
    memberTaskData.memberName = studentData.name

    if (assignedTasks.length === 0) {
      memberTaskData.assignedTasks = {}
      memberTaskData.tasksCompleted = {}
      memberTaskData.totalTimeWorked = 0
      memberTaskData.taskPointsCompleted = 0
    }
    else {
      memberTaskData.assignedTasks = assignedTasks
      memberTaskData.tasksCompleted = findTasksCompleted(assignedTasks)
      memberTaskData.totalTimeWorked = findTimeWorked(assignedTasks)
      memberTaskData.taskPointsCompleted = findTotalTaskWeight(assignedTasks)
    }
    groupMemberData.push(memberTaskData)
  }

  return groupMemberData
}