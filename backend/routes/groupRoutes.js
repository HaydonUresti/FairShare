import express from 'express'
import GroupModel from '../models/Group.js'

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
    res.status(500).send({ message: 'Server error' })
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
      res.status(400).send({ message: 'Group not found' })
    }
    res.status(200).send({ result })
  } catch (error) {
    res.status(500).send({ message: 'Server error' })
  }
}

router.post('/:userId/createGroup', createGroup) // will create a group
router.get('/:userId/groups', getEducatorGroups) // will get all groups owned by an educator
router.get('/owner/:ownerId/groupName/:groupName', getGroup) // will get a single group
router.patch('/:joinCode/members', addMember) // will add a member to a group
router.get('/:groupId/members', getGroupMembers) // will get all the members of a group
router.delete('/:groupId/members/:userId', removeMember) // will remove a member from a group
router.delete('/:groupId', deleteGroup) // will delete a group

export default router