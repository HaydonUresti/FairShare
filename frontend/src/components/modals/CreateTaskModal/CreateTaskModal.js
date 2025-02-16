import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { createNewTask } from '../../../services/taskService.js'
import { validateTaskWeight, validateTimeInput } from '../../../services/validationService.js'

const CreateTaskModal = ({ show, onHide, onSave, groupId }) => {
  const [task, setTask] = useState({})
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [estimatedTime, setEstimatedTime] = useState()
  const [taskWeight, setTaskWeight] = useState()


  const handleCreateTask = async () => {
    if (!groupId) {
      console.log('Missing groupId in task creation')
      return
    }
    const taskAttributes = []
    if (!title) {
      taskAttributes.push('title')
    }
    if (!description) {
      taskAttributes.push('description')
    }
    if (!estimatedTime) {
      taskAttributes.push('estimatedTime')
    }
    if (!taskWeight) {
      taskAttributes.push('taskWeight')
    }

    if (taskAttributes.length !== 0) {
      console.log(`Missing fields: ${taskAttributes}`)
      return
    }

    const creationBody = {
      "title": title,
      "description": description,
      "estimatedTime": estimatedTime,
      "taskWeight": taskWeight,
    }

    await createNewTask(groupId, creationBody)
    onHide()
    window.location.reload()
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="modal-header-style" closeButton>
        <Modal.Title>{task.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='task-info-div'>
        </div>

        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Enter task title'
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as='textarea'
              name='description'
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
            <Form.Label>Task Weight (1-10)</Form.Label>
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

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
        <Button variant='primary' onClick={handleCreateTask}>Create Task</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateTaskModal
