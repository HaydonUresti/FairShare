import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL

export default function SignIn() {
  const navigate = useNavigate()


  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [userRole, setUserRole] = useState('Educator')

  const clearForm = () => {
    setName('')
    setEmail('')
    setPassword('')
    setUserRole('Educator')
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const result = await axios.post(`${API_URL}/api/users/register`, { name, email, password, userRole })
      // clearForm()
      // navigate('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const result = await axios.post(`${API_URL}/api/users/login`, { email, password })
      console.log(`result: ${result}`)
      // clearForm()
      // navigate('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div >
        <h1>Sign In</h1>
        <div>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div>
              <label htmlFor="email">
                <strong>Name</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="on"
                name="name"
                onChange={(name) => setName(name.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="on"
                name="email"
                onChange={(email) => setEmail(email.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">
                <strong>Password</strong>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={(password) => setPassword(password.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlfor="userRole">Select an option:</label>
              <select
                id="userRoleSelection"
                name="userRole"
                onChange={(role) => setUserRole(role.target.value)}
              >
                <option value="Educator">Educator</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <button type="submit">Register</button>

          </form>
        </div>
        <div>
          <p>Already Have an Account?</p>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="on"
                name="email"
                onChange={(email) => setEmail(email.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">
                <strong>Password</strong>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  onChange={(password) => setPassword(password.target.value)}
                />
              </label>
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  )
}
