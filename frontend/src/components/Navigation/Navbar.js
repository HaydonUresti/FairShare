import React from "react"
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../services/userService.js'


export default function Navbar() {

  const handleSignInNavigation = () => {
    const userRole = localStorage.getItem('userRole')

    if (!userRole) return '/sign-in'
    if (userRole === 'Educator') return '/educator-dashboard'
    if (userRole === 'Student') return '/group-selection'
  }

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
  }

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/home"><strong>Home</strong></Link>
        </li>
        <li>
          <Link to={handleSignInNavigation()}><strong>About Us</strong></Link>
        </li>
        <li>
          {!localStorage.getItem('userId') ?
            (<Link to={handleSignInNavigation()}><strong>Sign In</strong></Link>) :
            (<p onClick={handleLogout} className="logout-link"><strong>Logout</strong></p>)
          }
        </li>
      </ul>
    </nav>
  )
}

// To do:
// add a Join Now button that optionally shows up on the home page when no one is signed in.