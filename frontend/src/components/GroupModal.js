import React, { useState, useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { removeGroupMember, deleteGroup } from '../services/groupServices.js'
import { createNewTask } from '../services/taskService.js'
import { getUserById } from '../services/userService.js'
import { useNavigate } from 'react-router-dom'

const GroupModal = ({ show, onHide, title, content, onSave, userRole }) => {
  const navigate = useNavigate()
  const [assignTaskMode, setAssignTaskMode] = useState(false)
  const [taskData, setTaskData] = useState({ title: '', description: '', estimatedTime: '', taskWeight: '' })
  const [memberNames, setMemberNames] = useState([])
  const [loadingMembers, setLoadingMembers] = useState(true)

  useEffect(() => {
    if (!content?.members || content.members.length === 0) {
      setLoadingMembers(false)
      return
    }

    const fetchMemberNames = async () => {
      try {
        const names = await Promise.all(
          content.members.map(async (memberId) => {
            const member = await getUserById(memberId)
            return member.name
          })
        )
        setMemberNames(names)
      } catch (error) {
        console.error(`Error fetching user names: ${error}`)
      } finally {
        setLoadingMembers(false)
      }
    }

    fetchMemberNames()
  }, [content?.members])

  const navigateToWorkspace = () => {
    navigate('/group-workspace', { state: { groupId: content?._id } })
  }

  const handleInputChange = (e) => {
    let { name, value } = e.target
    if (name === 'taskWeight') value = Math.max(1, Math.min(10, Math.floor(Number(value))))
    if (name === 'estimatedTime') value = Math.max(0.25, Math.round(Number(value) * 4) / 4)
    setTaskData(prev => ({ ...prev, [name]: value }))
  }

  const handLeaveGroup = async (e) => {
    e.preventDefault()
    try {
      await removeGroupMember(content?._id, localStorage.getItem('userId'))
      console.log('Successfully removed the user from the group')
      onSave()
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
      await createNewTask(content?._id, taskData)
      onSave()
      setAssignTaskMode(false)
      setTaskData({ title: '', description: '', estimatedTime: '', taskWeight: '' })
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
            <p>
              Members:{' '}
              {loadingMembers ? 'Loading...' : memberNames.length > 0 ? memberNames.join(', ') : 'No members'}
            </p>
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
        {userRole === 'Student' && (
          <Button variant='primary' onClick={navigateToWorkspace}>
            Workspace
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default GroupModal