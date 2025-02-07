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
    const groupData = {groupId: content._id}

    navigate('/group-workspace', {state: groupData})
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTaskData(prev => ({ ...prev, [name]: value }))
  };

  const handLeaveGroup = async (e) => {
    e.preventDefault()
    try {
      await removeGroupMember(content._id, localStorage.getItem('userId'))
      console.log('Successfully removed the user from the group')
      onSave();
      window.location.reload()
    } catch (error) {
      console.log(`Error leaving group: ${error}`)
    }
  };

  const handDeleteGroup = async (e) => {
    e.preventDefault()
    try {
      await deleteGroup(content._id)
      console.log('Successfully deleted the group')
      onSave()
      window.location.reload()
    } catch (error) {
      console.log(`Error deleting group: ${error}`)
    }
  };

  const handleAssignTask = async (e) => {
    e.preventDefault()
    try {
      console.log('Assigning Task:', taskData)
      await createNewTask(content._id, taskData)
      onSave();
      setAssignTaskMode(false); // Go back to default view after saving
      setTaskData({ title: '', description: '', estimatedTime: '', taskWeight: '' }) // Clear form
    } catch (error) {
      console.log(`Error assigning task: ${error}`)
    }
  };

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
              <Form.Label>Estimated Time (minutes)</Form.Label>
              <Form.Control
                type='number'
                name='estimatedTime'
                value={taskData.estimatedTime}
                onChange={handleInputChange}
                placeholder='e.g., 120'
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
