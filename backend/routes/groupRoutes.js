import express from 'express'
import GroupModel from '../models/Group.js'

import * as groupService from '../services/groupService.js'
import { createTaskDocument, getTaskDetails } from '../services/taskService.js'

const router = express.Router()

const createGroup = async (req, res) => {
  try {
    const { groupName, description, userId, joinCode } = req.body
    const missingFields = []
    if (!groupName) missingFields.push('name')
    if (!description) missingFields.push('description')
    if (!userId) missingFields.push('owner')
    if (!joinCode) missingFields.push('joinCode')
    if (missingFields.length > 0) {
      return res.status(400)
        .send(
          { message: `All fields are required. Missing fields: ${missingFields.join(', ')}` })
    }
    const newGroup = new GroupModel({ groupName, description, ownerId: userId, joinCode })
    await newGroup.save()
    res.status(201).send({ message: 'Group created successfully' })
  } catch (error) {
    res.status(500).send({ message: 'Server error', error })
  }
}

// get all groups owned by an educator
const getEducatorGroups = async (req, res) => {
  try {
    const userId = req.params.userId
    if (!userId) {
      return res.status(401).send({ message: 'Must include userId' })
    }
    const groups = await GroupModel.find({ ownerId: userId })
    res.status(200).send(groups)
  } catch (error) {
    res.status(500).send({ message: 'Server error' })
  }
}

// Get a single group from ownerId and groupName
const getGroup = async (req, res) => {
  try {
    if (!req.params.ownerId) {
      return res.status(400).send({ message: 'ownerId is required' })
    }
    if (!req.params.groupName) {
      return res.status(400).send({ message: 'groupName is required' })
    }
    const result = await GroupModel.findOne({ ownerId: req.params.ownerId, groupName: req.params.groupName })

    if (!result) {
      return res.status(404).send({ message: 'Group not found' })
    }
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ message: 'Server error' })
  }
}

// add a member to a group
const addMember = async (req, res) => {
  try {
    const joinCode = req.params.joinCode

    // the user being added
    const { userId } = req.body
    if (!joinCode) {
      return res.status(400).send({ message: 'Group joinCode is required' })
    }
    if (!userId) {
      return res.status(400).send({ message: 'User ID is required' })
    }

    const result = await GroupModel.findOneAndUpdate(
      { joinCode },
      { $addToSet: { members: userId } },
      { new: true }
    )

    if (!result) {
      return res.status(404).send({ message: 'Group not found' })
    }

    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ message: 'Server error' })
  }
}

// get all members of a group
const getGroupMembers = async (req, res) => {
  try {
    const groupId = req.params.groupId
    if (!groupId) {
      return res.status(400).send({ message: 'Group ID is required' })
    }

    const result = await GroupModel.findOne({ _id: groupId })
    if (!result) {
      return res.status(404).send({ message: 'Group not found' })
    }
    res.status(200).send(result.members)
  } catch (error) {
    res.status(500).send({ message: 'Server error' })
  }
}

const removeMember = async (req, res) => {
  try {
    const groupId = req.params.groupId
    const userId = req.params.userId

    if (!groupId) {
      return res.status(400).send({ message: 'Group ID is required' })
    }
    if (!userId) {
      return res.status(400).send({ message: 'Member ID is required' })
    }

    const result = await GroupModel.findByIdAndUpdate(
      { _id: groupId },
      { $pull: { members: userId } },
      { new: true }
    )
    if (!result) {
      return res.status(404).send({ message: 'Group not found' })
    }
    res.status(200).send(result)
  } catch (error) {
    res.status(500).send({ message: 'Server error' })
  }
}

const deleteGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId

    if (!groupId) {
      return res.status(400).send({ message: 'GroupId is required' })
    }

    const result = await GroupModel.deleteOne({ _id: groupId })
    if (!result) {
      return res.status(400).send({ message: 'Group not found' })
    }
    res.status(200).send({ result })
  } catch (error) {
    res.status(500).send({ message: 'Server error' })
  }
}

const getStudentGroups = async (req, res) => {
  try {
    const userId = req.query.userId
    if (!userId) {
      res.status(400).send({ message: 'UserId is required' })
    }
    const result = await GroupModel.find({ members: userId }).lean()
    if (!result) {
      res.status(400).send({ message: `No groups found for user: ${userId}` })
    }
    res.status(200).send({ result })
  } catch (error) {
    res.status(500).send({ message: 'Server error' })
  }
}

// gets all the tasks for a group
const getGroupTasks = async (req, res) => {
  try {
    const groupId = req.params.groupId

    if (!groupId) {
      res.status(400).send({ message: `Group ID is required` })
    }
    const response = groupService.getGroupTasks(groupId)
    if (!response) {
      return res.status(400).send({ message: `No tasks found for group: ${groupId}` })
    }
    const tasks = response.tasks
    res.status(200).send({ tasks })
  } catch {
    res.status(500).send({ message: `Server error: ${error.message}` })
  }
}

const createTaskForGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId
    const { title, description, estimatedTime, taskWeight } = req.body
    const params = { title, description, estimatedTime, taskWeight }

    // create the new task document and get the taskId
    const taskResponse = await createTaskDocument(params)
    const taskId = taskResponse._id

    // add the new task Id to the group object

    const response = await GroupModel.findOneAndUpdate(
      { _id: groupId },
      { $addToSet: { tasks: taskId } },
      { new: true }
    )
    if (!response) {
      return res.status(400).send({ message: `Group not found: ${groupId}` })
    }
    res.status(200).send({ response })
  } catch (error) {
    res.status(500).send({ message: `Server error: ${error.message}` })
  }
}

// gets the progress of all the tasks for the entire group
const getGroupProgress = async (req, res) => {
  try {
    const tasks = []
    const groupId = req.params.groupId
    if (!groupId) {
      return res.status(400).send({ message: 'groupId is required' })
    }
    // get all the list of tasks for the group 
    // Make this a new function because we do this two places now
    const groupData = await groupService.getGroupTasks(groupId)
    if (!groupData) {
      return res.status(404).send({ message: `No tasks found for group: ${groupId}` })
    }
    for (const task of groupData.tasks) {
      const taskDetails = await getTaskDetails(task)
      tasks.push(taskDetails)
    }
    res.status(200).send({ tasks })
    // retrieve each task with their details -> return 
  } catch (error) {
    res.status(500).send({ message: `Server error: ${error.message}` })
  }
}
// To Do:
// GET /groups/:groupId/students → Get all students in a group (with their task progress)

router.post('/:userId/createGroup', createGroup) // will create a group
router.get('/:userId/groups', getEducatorGroups) // will get all groups owned by an educator
router.get('/owner/:ownerId/groupName/:groupName', getGroup) // will get a single group
router.patch('/:joinCode/members', addMember) // will add a member to a group
router.get('/:groupId/members', getGroupMembers) // will get all the members of a group
router.delete('/:groupId/members/:userId', removeMember) // will remove a member from a group
router.delete('/:groupId', deleteGroup) // will delete a group
router.get('/getGroups', getStudentGroups)
router.get('/:groupId/tasks', getGroupTasks)
router.post('/:groupId/task', createTaskForGroup)
router.get('/:groupId/taskDetails', getGroupProgress)

export default router