import express from 'express'
import UserModel from '../models/Users.js';

const router = express.Router()

/**
 * @openapi
 * /api/users/register:
 *   post:
 *      tags:
 *        - Users
 *      summary: Register a new user
 *      description: This endpoint allows the creation of a new user with email, password, and name.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: The email of the user
 *                password:
 *                  type: string
 *                  description: The password for the user
 *                name:
 *                  type: string
 *                  description: The name of the user
 *                userRole:
 *                  type: string
 *                  description: The role of the user (educator or student)     
 *              required:
 *                - email
 *                - password
 *                - name
 *                - userRole
 *      responses:
 *        201:
 *          description: User registered successfully
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "User registered successfully"
 *        400:
 *          description: Email is already registered
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Email is already registered"
 *        500:
 *          description: Server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: "Server error"
 */
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, userRole } = req.body;
    const newUser = new UserModel({ email, password, name, userRole });
    await newUser.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Mongoose duplicate key error
      res.status(400).send({ message: "Email is already registered" });
    } else {
      res.status(500).send({ message: "Server error" });
    }
  }
})

export default router