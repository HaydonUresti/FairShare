import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/userService'

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()

      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userId')
      localStorage.removeItem('name')
      localStorage.removeItem('email')

      navigate('/sign-in')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  };

  return <button onClick={handleLogout}>Logout</button>
}

export default LogoutButton