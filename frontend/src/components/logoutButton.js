import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/userService'

const LogoutButton = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()

      localStorage.removeItem('token')
      sessionStorage.removeItem('token')

      navigate('/sign-in')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  };

  return <button onClick={handleLogout}>Logout</button>
}

export default LogoutButton