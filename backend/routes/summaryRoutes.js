import express from 'express'
import { getSummary } from '../services/summaryService.js'

const router = express.Router()

export const getOrCreateSummary = async (req, res) => {
  try {
    const groupId = req.body.groupId
    const studentId = req.body.studentId
    if (!groupId) {
      return res.status(400).send({ message: 'groupId is required' })
    }
    const data = req.body.data
    if (!data) {
      return res.status(400).send({ message: 'data is required' })
    }
    const response = await getSummary(groupId, data, studentId)
    if (!response) {
      return res.status(404).send({ message: ` No summary recieved` })
    }
    return res.status(200).send(response)
  } catch (error) {
    return res.status(500).send('Internal server error')
  }
}

router.post('/retrieveSummary', getOrCreateSummary)

export default router