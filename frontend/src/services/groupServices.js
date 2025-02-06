import axios from 'axios'
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


