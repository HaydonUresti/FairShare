import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

export default function SignIn() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = (e) => {
    console.log(API_URL)
    console.log({ name, email, password })
    e.preventDefault()
    axios.post(`${API_URL}/register`, { name, email, password })
      .then(result => console.log(`The result is ${JSON.stringify(result)}`))
      .catch(err => console.log(err))
  }

  return (
    <>
      <div >
        <h1>Sign In</h1>
        <div>
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Register</button>
            <p>Already Have an Account?</p>
            <button>Login</button>
          </form>
        </div>
      </div>
    </>
  )
}
