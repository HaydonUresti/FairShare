// export default GroupActionModal
import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { removeGroupMember, deleteGroup } from '../services/groupServices.js'

const GroupModal = ({ show, onHide, title, content, onSave, userRole }) => {

  const handLeaveGroup = async (e) => {
    e.preventDefault()
    try {
      await removeGroupMember(content._id, localStorage.getItem('userId'))
      console.log('Succesfully removed the user from the group')
      onSave()
      window.location.reload()
    } catch (error) {
      console.log(`Error leaving group: ${error}`)
    }
  }

  const handDeleteGroup = async (e) => {
    e.preventDefault()
    try {
      await deleteGroup(content._id)
      console.log('Succesfully removed the user from the group')
      onSave()
      window.location.reload()
    } catch (error) {
      console.log(`Error deleting group: ${error}`)
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{`Description: ${content?.description}`}</Modal.Body>
      <Modal.Footer>
        {
          (userRole === 'Educator') ?
            (
              <>
                <Button variant='warning' onClick={handDeleteGroup}>
                  Delete Group
                </Button>

                <Button variant='light' onClick={ }>
                  Assign New Task
                </Button>
              </> 
            ) :
            (
              <Button variant='warning' onClick={handLeaveGroup}>
                Leave Group
              </Button>
            )
        }
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={onSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default GroupModal