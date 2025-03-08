import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getGroupById } from '../../services/groupServices.js'
import { getTaskById } from '../../services/taskService.js'

import TaskDisplay from '../../components/TaskDisplayComponent/TaskDisplayComponent.js'
import IndividualTaskCard from '../../components/IndividulTaskCard/IndividualTaskCard.js'
import IndividualTaskModal from '../../components/modals/IndividualTaskModal/IndividualTaskModal.js'

export default function GroupWorkspace() {
  const currentUser = localStorage.getItem('userId')
  const location = useLocation()
  const groupData = location.state

  const [groupName, setGroupName] = useState("")
  const [groupMembers, setGroupMembers] = useState([])
  const [groupDescription, setGroupDescription] = useState("A group")
  const [groupTasks, setGroupTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [individualTasks, setIndividualTasks] = useState([])

  // for the modal
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedStudents, setSelectedStudents] = useState({})

  useEffect(() => {
    if (!groupData || !groupData.groupId) return

    const fetchGroupData = async () => {
      try {
        const response = await getGroupById(groupData.groupId)
        console.log("Fetched Group Data:", response.groupData)
        setGroupName(response.groupData.groupName)
        setGroupMembers(response.groupData.members)
        setGroupDescription(response.groupData.description)
        setGroupTasks(response.groupData.tasks)
        await getIndividualTasks(response.groupData.tasks)
      } catch (error) {
        console.error(`Error fetching groups: ${error}`)
      } finally {
        setLoading(false)
      }
    }

    fetchGroupData()
  }, [groupData])

  const getIndividualTasks = async (taskIds) => {
    if (!taskIds) return []

    const taskObjectsArray = []
    for (const taskId of taskIds) {
      const taskObject = await getTaskById(taskId)
      taskObjectsArray.push(taskObject)
    }

    const studentTasks = taskObjectsArray.filter(task =>
      task.task.progress.some(progressEntry => progressEntry.student === currentUser)
    )
    setIndividualTasks(studentTasks)
  }


  const handleCardClick = (task) => {
    setSelectedTask(task)
    setShowTaskModal(true)

    const assignedStudents = {}
    if (task?.task?.progress) {
      task.task.progress.forEach(({ student }) => {
        assignedStudents[student] = student
      })
    }

    setSelectedStudents(assignedStudents)
  }

  return (
    <>
      <div className="group-workspace">
        <div>
          <h1>{groupName} Workspace</h1>
        </div>
        <div className="workspace-div">
          <div className="group-task-display">
            {loading ? (
              <p>Loading group tasks...</p>
            ) : (
              <TaskDisplay taskIds={groupTasks} />
            )}
          </div>
          <hr id='task-hr'></hr>
          <div className='individual-tasks-div'>
            {individualTasks.length > 0 ? (
              individualTasks.map((task, index) => (
                <IndividualTaskCard
                  key={task?._id || Math.random()}
                  taskData={task}
                  isEven={index % 2 === 0}
                  onClick={() => handleCardClick(task)}
                />
              ))
            ) : (
              <p>No tasks assigned.</p>
            )}
          </div>
        </div>
        <button className='chat-button'><strong>Group Chat</strong></button>
      </div>

      <IndividualTaskModal
        show={showTaskModal}
        onHide={() => setShowTaskModal(false)}
        studentsAssigned={selectedStudents}
        taskData={selectedTask} />
    </>
  )
}
