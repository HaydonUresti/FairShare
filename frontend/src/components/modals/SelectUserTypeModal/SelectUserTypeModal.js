import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { registerUser, loginUser } from '../../../services/userService'
import { useNavigate } from 'react-router-dom'

const SelectUserTypeModal = ({ show, onHide, credentials, }) => {
  const [userRole, setUserRole] = useState('Educator')

  const navigate = useNavigate()


  const handleFinalizeAccount = async () => {
    const registerParams = { name: credentials.name, email: credentials.email, userRole, googleId: credentials.sub }
    try {
      await registerUser(registerParams)

      const signInParams = { email: credentials.email, googleId: credentials.sub }
      const result = await loginUser(signInParams)
      if (result?.data?.user?.role === 'Educator') {
        navigate(`/educator-dashboard`)
      } else if (result?.data?.user?.role === 'Student') {
        navigate('/group-selection', { state: { studentId: localStorage.getItem('userId') } })

      } else {
        console.log('Unknown user role:', result?.data.userRole)
      }
    } catch (error) {
      console.log('Register failed:', error)
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header className="modal-header-style" closeButton>
        <Modal.Title>Finish Setting Up Your Account</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>User Account Type</Form.Label>
            <Form.Select
              onChange={(role) => setUserRole(role.target.value)}
              placeholder='Enter task title'
            >
              <option value='Educator'>Educator</option>
              <option value='Student'>Student</option>
            </Form.Select>
          </Form.Group>


        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Cancel
        </Button>
        <Button variant='primary' onClick={handleFinalizeAccount}>Create Account</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SelectUserTypeModal
