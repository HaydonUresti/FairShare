import React from "react"
import { Link } from 'react-router-dom'

export default function Navbar() {

  const handleSignInNavigation = () => {
    const userRole = localStorage.getItem('userRole')

    if (!userRole) return '/sign-in'
    if (userRole === 'Educator') return '/educator-dashboard'
    if (userRole === 'Student') return '/group-selection'
  }

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to={handleSignInNavigation()}>Sign In</Link>
        </li>
      </ul>
    </nav>
  )
}