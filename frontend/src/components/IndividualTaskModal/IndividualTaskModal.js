import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { updateTask } from '../../services/taskService.js'

const IndividualTaskModal = ({ show, onHide, taskData }) => {
  const taskId = taskData?.task?._id
  const currentStudent = localStorage.getItem('userId')

  // Store initial values for comparison
  const initialProgress = taskData?.task?.progress[0] || {}

  const [timeWorked, setTimeWorked] = useState(initialProgress.timeWorked ?? 0)
  const [isCompleted, setIsCompleted] = useState(initialProgress.completed ?? false)
  const [notes, setNotes] = useState(initialProgress.notes ?? '')

  useEffect(() => {
    if (taskData?.task?.progress?.[0]) {
      setTimeWorked(taskData.task.progress[0].timeWorked ?? 0)
      setIsCompleted(taskData.task.progress[0].completed ?? false)
      setNotes(taskData.task.progress[0].notes ?? '')
    }
  }, [taskData])

  const handleStudentTaskUpdate = async (e) => {
    e.preventDefault()

    // Create an update object only with changed values
    let needToUpdateTask = false
    let completedHasChanged = false
    if (timeWorked !== initialProgress.timeWorked) {
      needToUpdateTask = true
    }
    if (isCompleted !== initialProgress.completed) {
      needToUpdateTask = true
      completedHasChanged = true
    }
    if (notes !== initialProgress.notes) {
      needToUpdateTask = true
    }

    // Don't send request if nothing changed
    if (!needToUpdateTask) {
      console.log('No changes to update')
      return onHide()
    }

    try {
      const updateBody = {
        "progress": [
          {
            "student": currentStudent,
            "timeWorked": timeWorked ? Number(timeWorked) + initialProgress?.timeWorked : initialProgress?.timeWorked,
            "completed": completedHasChanged ? isCompleted : initialProgress?.completed,
            "notes": notes
          }
        ]
      }

      await updateTask(taskId, updateBody)
      window.location.reload()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const handleStopTask = async () => {
    const updateBody = {
      progress: [
        {
          "student": undefined,
          "notes": taskData?.task?.progress[0]?.notes,
          "completed": taskData?.task?.progress[0]?.completed,
          "timeWorked": taskData?.task?.progress[0]?.timeWorked
        }
      ]
    }
    await updateTask(taskId, updateBody)
    window.location.reload()
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className='individual-task-modal-header' closeButton>
        <Modal.Title >{taskData?.task?.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className='individual-task-info'>
          <div className='individual-task-times'>
            <div className='individual-modal-time-div'>
              <h6>Estimated Time: {taskData?.task?.estimatedTime} hours</h6>
            </div>
            <div className='individual-modal-time-div'>
              <h6>Logged Time: {taskData?.task?.progress[0]?.timeWorked} hours</h6>
            </div>
          </div>
          <h6>Task Difficulty: {taskData?.task?.taskWeight} out of 10</h6>
          <h6>Task Description: </h6>
          <p>{taskData?.task?.description}</p>
          <h6>Student Notes: </h6>
          <p>{initialProgress.notes || "No notes yet"}</p>
        </div>

        <form onSubmit={handleStudentTaskUpdate}>
          <div className='time-logged-div'>
            <label htmlFor="timeLogged" className='individual-task-form-label'>
              <strong>Log Time</strong>
              <input
                type="number"
                step='0.25'
                min='0'
                placeholder="Add time worked in hours"
                name="timeLogged"
                onChange={(e) => setTimeWorked(Number(e.target.value))}
              />
            </label>
          </div>

          <div className='student-notes-div'>
            <label htmlFor="notes" className='individual-task-form-label'>
              <strong>Add Notes</strong>
              <textarea
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes about the task"
                rows={5}
                cols={40}
              />
            </label>
          </div>

          <div className='completed-div'>
            <label htmlFor="completed">
              <strong>Task is Complete </strong>
              <input
                className='completed-checkbox'
                type="checkbox"
                name="completed"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
              />
            </label>
          </div>

          <Modal.Footer>
            {
              !initialProgress.completed &&
              <Button variant='warning' onClick={() => handleStopTask()}>Stop Task</Button>
            }
            <Button variant='primary' type="submit">Save</Button>
            <Button variant='secondary' onClick={onHide}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default IndividualTaskModal
