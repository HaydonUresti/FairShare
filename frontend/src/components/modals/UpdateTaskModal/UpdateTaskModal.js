import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { updateTask } from '../../../services/taskService.js'
import { validateTaskWeight, validateTimeInput } from '../../../services/validationService.js'

const UpdateTaskModal = ({ show, onHide, taskData, studentsAssigned, onSave }) => {
  const initialProgress = taskData?.progress[0] || {}

  const [task, setTask] = useState({})
  const [title, setTitle] = useState(taskData?.title)
  const [description, setDescription] = useState(taskData?.description)
  const [estimatedTime, setEstimatedTime] = useState(taskData?.estimatedTime)
  const [taskWeight, setTaskWeight] = useState(taskData?.taskWeight)
  const [timeWorked, setTimeWorked] = useState(taskData?.progress?.[0]?.timeWorked)
  const [completed, setCompleted] = useState(taskData?.progress?.[0]?.completed)
  const [notes, setNotes] = useState(taskData?.progress?.[0]?.notes)



  useEffect(() => {
    if (taskData && Object.keys(taskData).length > 0) {
      setTask(taskData)
      setTitle(taskData?.title)
      setDescription(taskData?.description)
      setEstimatedTime(taskData?.estimatedTime)
      setTaskWeight(taskData?.taskWeight)
      setTimeWorked(taskData?.progress?.[0]?.timeWorked)
      setCompleted(taskData?.progress?.[0]?.completed)
      setNotes(taskData?.progress?.[0]?.notes)
    }
  }, [taskData])

  const handleUpdateTask = async () => {
    if (!task?._id) return

    let needToUpdateTask = false
    let completedHasChanged = false

    if (title !== initialProgress.title) {
      needToUpdateTask = true
    }
    if (description !== initialProgress.description) {
      needToUpdateTask = true
    }
    if (estimatedTime !== initialProgress.estimatedTime) {
      needToUpdateTask = true
    }
    if (taskWeight !== initialProgress.taskWeight) {
      needToUpdateTask = true
    }
    if (timeWorked !== initialProgress.timeWorked) {
      needToUpdateTask = true
    }
    if (completed !== initialProgress.completed) {
      needToUpdateTask = true
      completedHasChanged = true
    }
    if (notes !== initialProgress.notes) {
      needToUpdateTask = true
    }

    if (!needToUpdateTask) {
      console.log('No changes to update')
      return onHide()
    }

    const updateBody = {
      "title": title,
      "description": description,
      "estimatedTime": estimatedTime,
      "taskWeight": taskWeight,
      "progress": [
        {
          "student": taskData?.progress?.[0]?.student,
          "timeWorked": timeWorked ? Number(timeWorked) : initialProgress?.timeWorked,
          "completed": completedHasChanged ? completed : initialProgress?.completed,
          "notes": notes
        }
      ]
    }

    await updateTask(task._id, updateBody)
    onHide()
    window.location.reload()
  }

  if (!taskData) return null

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="modal-header-style" closeButton>
        <Modal.Title>{task.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='task-info-div'>
          <div className='assignee-div'>
            <p><strong>Assigned To:</strong>
              {!studentsAssigned ? 'Loading...'
                : Object.values(studentsAssigned).length > 0
                  ? Object.values(studentsAssigned).join(', ')
                  : 'No one assigned'}
            </p>
          </div>
        </div>

        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter task title'
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter task description'
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Estimated Time (hours)</Form.Label>
            <Form.Control
              type='number'
              name='estimatedTime'
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(validateTimeInput(e.target.value))}
              placeholder='e.g., 6 or 14.25'
              step='0.25'
              min='0.25'
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Logged Time</Form.Label>
            <Form.Control
              type='number'
              name='timeWorked'
              value={timeWorked}
              onChange={(e) => setTimeWorked(validateTimeInput(e.target.value))}
              placeholder='e.g., 11 or 5.75'
              step='0.25'
              min='0.25'
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Task Weight</Form.Label>
            <Form.Control
              type='number'
              name='taskWeight'
              value={taskWeight}
              onChange={(e) => setTaskWeight(validateTaskWeight(e.target.value))}
              placeholder='e.g., 5'
              min='1'
              max='10'
              step='1'
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Completed</Form.Label>
            <Form.Check
              type='checkbox'
              name='completed'
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              type='text'
              name='notes'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder='Enter notes'
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
        <Button variant='primary' onClick={handleUpdateTask}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default UpdateTaskModal
