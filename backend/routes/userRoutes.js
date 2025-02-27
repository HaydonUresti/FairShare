import express from 'express'
import UserModel from '../models/Users.js'
import jwt from 'jsonwebtoken'

import * as userService from '../services/userService.js'

const router = express.Router()

const registerUser = async (req, res) => {
  try {
    const { email, password, name, userRole } = req.body
    const missingFields = [];
    if (!email) missingFields.push('email')
    if (!password) missingFields.push('password')
    if (!name) missingFields.push('name')
    if (!userRole) missingFields.push('userRole')
    if (missingFields.length > 0) {
      return res.status(400)
        .send(
          { message: `All fields are required. Missing fields: ${missingFields.join(', ')}` })
    }
    const newUser = new UserModel({ email, password, name, userRole })
    await newUser.save();
    res.status(201).send({ message: "User registered successfully" })
  } catch (error) {
    if (error.code === 11000) {
      // Mongoose duplicate key error
      res.status(400).send({ message: "Email is already registered" })
    } else {
      res.status(500).send({ message: "Server error" })
    }
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send({ message: "All fields are required" })
  }
  try {
    const user = await UserModel.findOne({ email })
    if (!user || !userService.validatePassword(password, user.password)) {
      return res.status(401).send({ message: 'Invalid credentials' })
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict',
    //   maxAge: 3600000,  // Expires in 1 hour
    //   path: '/'
    // })

    res.status(200).send(
      {
        token,
        message: 'Logged in successfully',
        user: {
          id: user._id,
          email: user.email,
          role: user.userRole,
          name: user.name
        }
      });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send({ message: 'Server error', error })
  }
}

const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token', { path: '/' })
    res.status(200).send({ message: 'Logged out successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Server error', error })
  }
}


const getUserIdByEmail = async (req, res) => {
  try {
    const userEmail = req.query.email
    if (!userEmail) {
      return res.status(400).send({ message: 'Email is required' })
    }
    const response = await UserModel.findOne({ email: userEmail })
    const userId = response._id.toString()
    res.status(200).send({ userId: userId })
  } catch (error) {
    res.status(500).send({ message: 'Server error', error })
  }
}

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId
    if (!userId) {
      return res.status(400).send({ message: 'userId is required' })
    }
    const response = await UserModel.findOne({ _id: userId })
    if (!response) {
      return res.status(404).send({ message: `User ${userId} not found` })
    }
    return res.status(200).send(response)
  } catch (error) {
    return res.status(500).send('Internal server error')
  }
}

router.post('/logout', logoutUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getUserIdByEmail', getUserIdByEmail)
router.get('/:userId', getUserById) // retrieve a user by their ID


export default router