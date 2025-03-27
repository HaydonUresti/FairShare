import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL


export const loginUser = async ({ email, password, googleId }) => {
  try {
    const result = await axios.post(
      `${API_URL}/api/users/login`,
      { email, password, googleId },
      {
        withCredentials: true,
      }
    )
    // console.log(`Login result: ${JSON.stringify(result, null, 2)}`)
    if (result.data) {
      localStorage.setItem('authToken', result.data.token)
      localStorage.setItem('userRole', result.data.user.role)
      localStorage.setItem('userId', result.data.user.id)
      localStorage.setItem('name', result.data.user.name)
      localStorage.setItem('email', result.data.user.email)
    }
    return result
  } catch (error) {
    console.error("Login failed:", error)
    throw error
  }
}

export const registerUser = async ({ name, email, password, userRole, googleId }) => {
  try {
    const result = await axios.post(
      `${API_URL}/api/users/register`,
      {
        name,
        email,
        password,
        userRole,
        googleId
      })
    // console.log(`Register result: ${JSON.stringify(result, null, 2)}`)
    return result
  } catch (error) {
    console.error("Register failed:", error)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userRole')
  } catch (error) {
    console.error('Error logging out: ', error)
  }
}

export const getUserById = async (userId) => {
  if (!userId) return
  try {
    const result = await axios.get(`${API_URL}/api/users/${userId}`)
    return result.data
  } catch (error) {
    console.error('Error retrieving user: ', error)
  }
}

export const getUserByEmail = async (email) => {
  if (!email) return
  try {
    const result = await axios.get(`${API_URL}/api/users/getUserIdByEmail/${email}`)
    return result?.data
  } catch (error) {
    console.error('Error retrieving user: ', error)
  }
}