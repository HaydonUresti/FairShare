import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL


export const retrieveSummary = async (groupId, data, studentId) => {
  try {
    if (!groupId || !data) {
      throw new Error('missing required paramaters')
    }
    const summaryResponse = await axios.post(
      `${API_URL}/api/summary/retrieveSummary`,
      {
        groupId,
        data,
        studentId
      }
    )
    return summaryResponse.data
  } catch (error) {
    console.error(`Failed to retrieve a summary: ${error}`)
    throw error
  }
}