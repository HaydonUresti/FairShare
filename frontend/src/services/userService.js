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
    )
    console.log(`Login result: ${JSON.stringify(result, null, 2)}`)
    if (result.data) {
      console.log(result.data)
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

// 3️ Frontend: Use Token in Protected Requests
// When making authenticated requests, include the token in the Authorization header.

//  Example: Fetch User Data
// js
// Copy
// Edit
// const fetchUserData = async () => {
//   const token = localStorage.getItem("authToken"); // Get token from localStorage

//   if (!token) {
//     console.error("No token found, user is not authenticated.");
//     return;
//   }

//   try {
//     const response = await axios.get("http://localhost:5000/api/users/profile", {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     console.log("User Data:", response.data);
//   } catch (error) {
//     console.error("Error fetching user data:", error.response?.data?.message || error.message);
//   }
// };
//  Every protected request includes the Authorization: Bearer <token> header.