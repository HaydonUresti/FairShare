import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getGroupById } from '../../services/groupServices.js'
import { getTaskById } from '../../services/taskService.js'

import TaskCard from '../../components/TaskCard/TaskCard.js'

export default function GroupWorkspace() {
  const location = useLocation()
  const groupData = location.state

  const [groupName, setGroupName] = useState('')
  const [groupMembers, setGroupMembers] = useState([])
  const [groupDescription, setGroupDescription] = useState('A group')
  const [groupTasks, setGroupTasks] = useState([])



  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const response = await getGroupById(groupData.groupId)
        setGroupName(response.groupData.groupName)
        setGroupMembers(response.groupData.members)
        setGroupDescription(response.groupData.description)
        setGroupTasks(response.groupData.tasks)

      } catch (error) {
        console.error(`Error fetching groups: ${error}`)
      }
    }
    fetchGroupData()
  })

  const handleGetTaskData = async (taskId) => {
    try {
      const taskData = await getTaskById(taskId)
      return taskData
    } catch (error) {
      console.error(`Error fetching task data: ${error}`)
    }
  }

  return (
    <div className='group-workspace'>
      <h1>Group {groupName} Workspace</h1>
      <div className='group-task-display'>
        {/* This will break because it renders first. Fix this by doing what you did the to the cards or wherever you did that. */}
        <TaskCard taskData={handleGetTaskData(groupTasks[0])}></TaskCard>
      </div>
    </div>
  )
}

