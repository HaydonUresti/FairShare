import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../../services/userService'

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
      await registerUser(name, email, password, userRole)
    } catch (error) {
      console.log('Register failed:', error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const result = await loginUser(email, password)

      if (result?.data?.user?.role === 'Educator') {
        navigate(`/educator-dashboard`)
      } else if (result?.data?.user?.role === 'Student') {
        navigate('/group-selection', { state: { studentId: localStorage.getItem('userId') } })

      } else {
        console.log('Unknown user role:', result?.data.userRole)
      }
    } catch (error) {
      console.log('Login failed:', error)
    }
  }


  return (
    <>
      <div className='signin-page'>
        {/* <h1>Sign In</h1> */}
        <div className='signup-div'>
          <h2 className='login-headers'>Register</h2>
          <form onSubmit={handleRegister}>
            <div>
              <label htmlFor='email'>
                <strong>Name</strong>
              </label>
              <input
                type='text'
                placeholder='Enter Name'
                autoComplete='on'
                name='name'
                onChange={(name) => setName(name.target.value)}
              />
            </div>
            <div>
              <label htmlFor='email'>
                <strong>Email</strong>
              </label>
              <input
                type='email'
                placeholder='Enter Email'
                autoComplete='on'
                name='email'
                onChange={(email) => setEmail(email.target.value)}
              />
            </div>
            <div className='signin-group'>
              <label htmlFor='email'>
                <strong>Password</strong>
                <input
                  type='password'
                  placeholder='Enter Password'
                  name='password'
                  onChange={(password) => setPassword(password.target.value)}
                />
              </label>
            </div>
            <div>
              <label htmlfor='userRole'><strong>Select an account type:</strong></label>
              <select
                id='userRoleSelection'
                name='userRole'
                onChange={(role) => setUserRole(role.target.value)}
              >
                <option value='Educator'>Educator</option>
                <option value='Student'>Student</option>
              </select>
            </div>
            <button type='submit' className='login-button'><strong>Register</strong></button>
          </form>
        </div>
        <p className='signin-divider-div'><strong>Already have an account?</strong></p>
        <div className='login-div'>
          <h2 className='login-headers'>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor='email'>
                <strong>Email</strong>
              </label>
              <input
                type='email'
                placeholder='Enter Email'
                autoComplete='on'
                name='email'
                onChange={(email) => setEmail(email.target.value)}
              />
            </div>
            <div>
              <label htmlFor='email'>
                <strong>Password</strong>
                <input
                  type='password'
                  placeholder='Enter Password'
                  name='password'
                  onChange={(password) => setPassword(password.target.value)}
                />
              </label>
            </div>
            <button className='login-button' type='submit'><strong>Login</strong></button>
          </form>
        </div>
      </div>
    </>
  )
}
