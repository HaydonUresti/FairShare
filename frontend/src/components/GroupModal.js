import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { removeGroupMember, deleteGroup, } from '../services/groupServices.js'
import { createNewTask } from '../services/taskService.js'
import { useNavigate } from 'react-router-dom'

const GroupModal = ({ show, onHide, title, content, onSave, userRole }) => {
  const navigate = useNavigate()

  const [assignTaskMode, setAssignTaskMode] = useState(false) // Track if a new task is being
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    taskWeight: ''
  });

  const navigateToWorkspace = () => {
    const groupData = { groupId: content?._id }

    navigate('/group-workspace', { state: groupData })
  }

  const validateHours = (value) => {
    let numValue = Number(value)
    if (numValue < 0.25) numValue = 0.25
    numValue = Math.round(numValue * 4) / 4
    return `${numValue}`
  }

  const validateWeight = (value) => {
    let numValue = Number(value)
    if (numValue < 1) numValue = 1
    if (numValue > 10) numValue = 10
    numValue = Math.floor(Number(numValue))
    return `${numValue}`
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target
    if (name === 'taskWeight') {
      value = validateWeight(value)
    }
    if (name === 'estimatedTime') {
      value = validateHours(value)
    }
    console.log(`Updated ${name}:`, value)
    setTaskData(prev => ({ ...prev, [name]: value }))
  }

  const handLeaveGroup = async (e) => {
    e.preventDefault()
    try {
      await removeGroupMember(content?._id, localStorage.getItem('userId'))
      console.log('Successfully removed the user from the group')
      onSave();
      window.location.reload()
    } catch (error) {
      console.log(`Error leaving group: ${error}`)
    }
  }

  const handDeleteGroup = async (e) => {
    e.preventDefault()
    try {
      await deleteGroup(content?._id)
      console.log('Successfully deleted the group')
      onSave()
      window.location.reload()
    } catch (error) {
      console.log(`Error deleting group: ${error}`)
    }
  }

  const handleAssignTask = async (e) => {
    e.preventDefault()
    try {
      taskData.estimatedTime = validateHours(taskData.estimatedTime)
      taskData.taskWeight = validateWeight(taskData.taskWeight)
      await createNewTask(content?._id, taskData)
      onSave();
      setAssignTaskMode(false); // Go back to default view after saving
      setTaskData({ title: '', description: '', estimatedTime: '', taskWeight: '' }) // Clear form
    } catch (error) {
      console.log(`Error assigning task: ${error}`)
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{assignTaskMode ? 'Assign New Task' : title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {assignTaskMode ? (
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={taskData.title}
                onChange={handleInputChange}
                placeholder='Enter task title'
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                name='description'
                value={taskData.description}
                onChange={handleInputChange}
                placeholder='Enter task description'
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Estimated Time (hours)</Form.Label>
              <Form.Control
                type='number'
                name='estimatedTime'
                value={taskData.estimatedTime}
                onChange={handleInputChange}
                placeholder='e.g., 120'
                step='0.25'
                min='0.25'
              />
            </Form.Group>

            <Form.Group className='mb-3'>
              <Form.Label>Task Weight</Form.Label>
              <Form.Control
                type='number'
                name='taskWeight'
                value={taskData.taskWeight}
                onChange={handleInputChange}
                placeholder='e.g., 5'
                min='1'
                max='10'
                step='1'
              />
            </Form.Group>
          </Form>
        ) : (
          <>
            <p>{`Description: ${content?.description}`}</p>
            <p>{`Members: ${content?.members}`}</p>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        {assignTaskMode ? (
          <>
            <Button variant='secondary' onClick={() => setAssignTaskMode(false)}>
              Back
            </Button>
            <Button variant='primary' onClick={handleAssignTask}>
              Assign Task
            </Button>
          </>
        ) : userRole === 'Educator' ? (
          <>
            <Button variant='warning' onClick={handDeleteGroup}>
              Delete Group
            </Button>
            <Button variant='success' onClick={() => setAssignTaskMode(true)}>
              Assign New Task
            </Button>
          </>
        ) : (
          <Button variant='warning' onClick={handLeaveGroup}>
            Leave Group
          </Button>
        )}

        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
        {(userRole === 'Student') && (
          <Button variant='primary' onClick={navigateToWorkspace}>
            Workspace
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default GroupModal
