import React, { useState, useEffect } from 'react'
import { getUserById } from '../../services/userService.js'
import { updateTask, deleteTask } from '../../services/taskService.js'

const TaskDrawer = ({ taskData, handleModal, groupId }) => {
  const title = taskData?.task?.title
  const description = taskData?.task?.description
  const estimatedTime = taskData?.task?.estimatedTime
  const taskWeight = taskData?.task?.taskWeight
  const studentAssigned = taskData?.task?.progress[0]?.student
  const timeWorked = taskData?.task?.progress[0]?.timeWorked
  const completed = taskData?.task?.progress[0]?.completed
  const notes = taskData?.task?.progress[0]?.notes


  const [isOpen, setIsOpen] = useState(false)
  const [names, setNames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!taskData?.task?.progress[0]?.student || taskData?.task?.progress[0]?.length === 0) {
      setLoading(false)
      return
    }

    const fetchUserNames = async () => {
      try {
        const memberNames = await Promise.all(
          taskData?.task?.progress?.map(async (entry) => {
            const student = await getUserById(entry.student)
            return student.name
          })
        )

        setNames(memberNames)
      } catch (error) {
        console.error(`Error fetching user names: ${error}`)
      } finally {
        setLoading(false)
      }
    }

    fetchUserNames()
  }, [taskData?.task?.progress])

  const handleDeleteTask = async () => {
    await deleteTask(groupId, taskData?.task?._id)
    window.location.reload()
  }

  if (loading) return <p>Loading task...</p>

  return (
    <div className={`task-drawer ${isOpen ? "open" : ""}`}>
      {/* Drawer Header (Always Visible) */}
      <div className="drawer-preview" onClick={() => setIsOpen(!isOpen)}>
        {
          completed &&
          <>
            <div className='individual-completed-task-div'>
              <h3 className='fix-header-margin'>Completed</h3>
            </div>
          </>
        }
        <div className='educator-task-title-div'>
          <h4 className='fix-header-margin'>{title}</h4>
        </div>
        <div className='educator-estimation-div'>
          <p className='educator-task-info-p'><strong>Time: </strong> </p>
          <p className='educator-task-info-p'>{estimatedTime} hours</p>
        </div>
        <div className='educator-estimation-div'>
          <p className='educator-task-info-p'><strong>Logged Time: </strong> </p>
          <p className='educator-task-info-p'>{timeWorked || 0} hours</p>
        </div>
        <div className='educator-estimation-div'>
          <p className='educator-task-info-p'><strong>Weight:</strong> </p>
          <p className='educator-task-info-p'>{taskWeight} out of 10</p>
        </div>
        <div className='educator-description'>
          <p className='educator-task-info-p'><strong>Description:</strong> {description}</p>
        </div>
      </div>

      {/* The opened drawer*/}
      {isOpen && (
        <div className="drawer-content" onClick={() => setIsOpen(!isOpen)}>
          <hr></hr>
          <div className='main-drawer-div'>
            <h5>Currently Assinged To: {names.length > 0 ? names : 'No student currently assigned'}</h5>
            <div>
              <h5>Student notes: </h5>
              <p>{notes || 'No notes recorded'}</p>
            </div>
          </div>
          <hr></hr>
          <div className='drawer-footer'>
            <button onClick={handleDeleteTask}>Delete Task</button>
            <button onClick={() => handleModal(taskData.task, names)}>Update Task</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default TaskDrawer