import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getGroupById } from '../../services/groupServices.js'
import { getTaskById } from '../../services/taskService.js'

import TaskDisplay from '../../components/TaskDisplayComponent/TaskDisplayComponent.js'

export default function GroupWorkspace() {
  const location = useLocation()
  const groupData = location.state

  const [groupName, setGroupName] = useState('')
  const [groupMembers, setGroupMembers] = useState([])
  const [groupDescription, setGroupDescription] = useState('A group')
  const [groupTasks, setGroupTasks] = useState([])
  // const [loading, setLoading] = useState(true)



  useEffect(() => {
    if (!groupData || !groupData.groupId) return
    // if (!) {
    // // See Group card, but this should probably go in task display

    // }
    const fetchGroupData = async () => {
      try {
        const response = await getGroupById(groupData.groupId)
        console.log("Fetched Group Data:", response.groupData)
        setGroupName(response.groupData.groupName)
        setGroupMembers(response.groupData.members)
        setGroupDescription(response.groupData.description)
        setGroupTasks(response.groupData.tasks)

      } catch (error) {
        console.error(`Error fetching groups: ${error}`)
      }
      // finally {
      //   setLoading(false)
      // }
    }
    fetchGroupData()
  }, [groupData])


  return (
    <div className='group-workspace'>
      <div>
        <h1>{groupName} Workspace</h1>
      </div>
      <div className='workspace-div'>
        <div className='group-task-display'>
          {/* This will break because it renders first. Fix this by doing what you did the to the cards or wherever you did that. */}
          {/* <TaskCard taskData={handleGetTaskData(groupTasks[0])}></TaskCard> */}
          <TaskDisplay taskIds={groupTasks}></TaskDisplay>
        </div>
      </div>
    </div>
  )
}

