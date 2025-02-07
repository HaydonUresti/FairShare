import React, { useState, useEffect } from 'react'
import TaskCard from '../TaskCard/TaskCard.js'

import { getTaskById } from '../../services/taskService.js'


const TaskDisplay = ({ taskIds }) => {
  console.log("Received taskIds in TaskDisplay:", taskIds)
  const [loading, setLoading] = useState(true)
  const [groupTasks, setGroupTasks] = useState([])

  useEffect(() => {
    if (!taskIds || taskIds.length === 0) {
      setLoading(false)
      return
    }

    const fetchTaskDetails = async () => {
      try {
        const taskDetails = await Promise.all(
          taskIds.map(async (taskId) => {
            const task = await getTaskById(taskId)
            console.log("Fetched Task:", task)
            return task
          })
        )
        setGroupTasks(taskDetails)
      } catch (error) {
        console.error(`Error fetching user names: ${error}`)
      } finally {
        setLoading(false)
      }
    }
    fetchTaskDetails()
  }, [taskIds])

  if (loading) return <p>Loading tasks...</p>


  return (
    <div className='task-display-div'>
      {/* <h2>TaskDisplay</h2> */}
      {
        groupTasks.map((task) => (
          <>
            {console.log(groupTasks)}
            {console.log(`-----------Task id---------: ${task} `)}

            <TaskCard key={task?._id || Math.random()} taskData={task}></TaskCard>
          </>
        ))
      }
    </div>
  )
}

export default TaskDisplay