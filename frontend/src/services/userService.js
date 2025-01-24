import axios from "axios"
const API_URL = process.env.REACT_APP_API_URL


export const loginUser = async (email, password) => {
  try {
    const result = await axios.post(
      `${API_URL}/api/users/login`,
      { email, password },
      {
        withCredentials: true,
      }
    );
    console.log(`Login result: ${JSON.stringify(result, null, 2)}`)
    return result
  } catch (error) {
    console.error("Login failed:", error)
    throw error
  }
}

export const registerUser = async (name, email, password, userRole) => {
  try {
    const result = await axios.post(
      `${API_URL}/api/users/register`,
      {
        name,
        email,
        password,
        userRole
      })
    console.log(`Register result: ${JSON.stringify(result, null, 2)}`)
    return result
  } catch (error) {
    console.error("Register failed:", error)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    console.log('Logging out...')
    const result = await axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true });
    console.log(result.data.message)
  } catch (error) {
    console.error('Error logging out:', error)
  }
}