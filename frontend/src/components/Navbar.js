import React from "react"
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
      </ul>
    </nav>
  )
}