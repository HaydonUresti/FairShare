import OpenAI from 'openai'
import Summary from '../models/Summary.js'
import 'dotenv/config';
import { groupMessage, studentMessage, userDataContext } from '../utils/systemMessages.js'

const key = process.env.OPENAI_API_KDEY
const GPT_MODEL = 'gpt-3.5-turbo'
const openai = new OpenAI({
  apiKey: key
})

const getOpenAiResponse = async (studentId, userMessage) => {
  const systemMessage = studentId ? studentMessage : groupMessage
  try {
    const response = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: typeof userMessage === 'string' ? userMessage : JSON.stringify(userMessage) }
      ]
    })
    return response.choices[0].message.content
  }
  catch (error) {
    console.error('Error fetching OpenAI response: ', error)
    return 'Error generating summary.'
  }
}

const buildUserMessage = (data) => {
  const userMessage = {}
  userMessage.data = data
  userMessage.context = userDataContext
  return JSON.stringify(userMessage)
}

const deleteSummary = async (groupId, studentId) => {
  const query = studentId ? { groupId, studentId } : { groupId }
  await Summary.deleteOne(query)
}

export const getSummary = async (groupId, data, studentId) => {
  const query = studentId ? { groupId, studentId } : { groupId }
  let summaryDoc = await Summary.findOne(query)

  // if we have a summary and it is trying to use the same data, return what we have
  if (summaryDoc?.data === JSON.stringify(data)) {
    return summaryDoc.summary
  }

  // otherwise delete what is there, create a new summary, and save it
  const userMessage = buildUserMessage(data)
  await deleteSummary(groupId, studentId)
  console.log(`User Messate === ${userMessage}`)
  const newSummary = await getOpenAiResponse(studentId, userMessage)
  summaryDoc = new Summary({ groupId, studentId, summary: newSummary, data: JSON.stringify(data) })
  await summaryDoc.save()
  return newSummary
}