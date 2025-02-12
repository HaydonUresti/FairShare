import React, { useState, useEffect } from 'react'
import TaskCard from '../TaskCard/TaskCard.js'
import StudentTaskModal from '../StudentTaskModal/StudentTaskModal.js'
import IndividualTaskModal from '../IndividualTaskModal/IndividualTaskModal.js'
import { getTaskById } from '../../services/taskService.js'
import { getUserById } from '../../services/userService.js'

const TaskDisplay = ({ taskIds }) => {
  const [loading, setLoading] = useState(true)
  const [groupTasks, setGroupTasks] = useState([])
  const [studentsAssignments, setStudentAssignments] = useState({})
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedStudents, setSelectedStudents] = useState({})
  const [isAssignedToUser, setIsAssignedToUser] = useState(false)

  useEffect(() => {
    if (!taskIds) return

    if (taskIds.length === 0) {
      setLoading(false)
      return
    }

    const fetchTaskDetails = async () => {
      setLoading(true)
      try {
        const tasks = await Promise.all(taskIds.map(getTaskById))

        setGroupTasks(tasks)

        const studentIds = new Set()
        tasks.forEach(task => {
          if (task.task?.progress) {
            Object.values(task.task.progress).forEach(({ student }) => {
              studentIds.add(student)
            })
          }
        })

        const studentData = await Promise.all([...studentIds].map(getUserById))
        const studentMap = {}
        studentData.forEach(student => {
          studentMap[student?._id] = student?.name
        })

        setStudentAssignments(studentMap)
      } catch (error) {
        console.error(`Error fetching tasks or students: ${error}`)
      } finally {
        setLoading(false)
      }
    }

    fetchTaskDetails()
  }, [taskIds])

  const handleCardClick = (task) => {
    setSelectedTask(task)

    const assignedStudents = {}
    const userId = localStorage.getItem('userId') // Get the logged-in user's ID
    let isUserAssigned = false

    if (task?.task?.progress) {
      Object.values(task.task.progress).forEach(({ student }) => {
        if (studentsAssignments[student]) {
          assignedStudents[student] = studentsAssignments[student]
        }
        if (student === userId) {
          isUserAssigned = true
        }
      })
    }

    setSelectedStudents(assignedStudents)
    setIsAssignedToUser(isUserAssigned) 
    setShowTaskModal(true)
  }

  if (loading) return <p>Loading tasks...</p>

  return (
    <div className={`task-display-div ${groupTasks.length === 0 ? "no-tasks" : ''}`}>
      {groupTasks.length > 0 ? (
        groupTasks.map((task) => (
          <TaskCard
            key={task?._id || Math.random()}
            taskData={task}
            studentAssignments={studentsAssignments}
            onClick={() => handleCardClick(task)}
          />
        ))
      ) : (
        <p>No tasks assigned.</p>
      )}

      {isAssignedToUser ? (
        <IndividualTaskModal
          show={showTaskModal}
          onHide={() => setShowTaskModal(false)}
          studentsAssigned={selectedStudents}
          taskData={selectedTask}
        />
      ) : (
        <StudentTaskModal
          show={showTaskModal}
          onHide={() => setShowTaskModal(false)}
          studentsAssigned={selectedStudents}
          taskData={selectedTask}
        />
      )}
    </div>
  )
}

export default TaskDisplay
