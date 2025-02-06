import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { createGroup, addGroupMember } from '../services/groupServices'

const GroupActionModal = ({ show, onHide, onSave, action }) => {
  const [groupName, setGroupName] = useState()
  const [description, setDescription] = useState()
  const [joinCode, setjoinCode] = useState()


  const handleSubmission = async (e) => {
    e.preventDefault()
    if (action === 'Educator') {
      try {
        const result = await createGroup(groupName, description, joinCode)
        console.log(`Successfully created group: ${result}`)
        onSave()
        window.location.reload()
      } catch (error) {
        console.log(`Error creating new group: ${error}`)
      }
    }
    try {
      const result = await addGroupMember(joinCode)
      console.log(`Successfully created group: ${result}`)
      onSave()
      window.location.reload()
    } catch (error) {
      console.log(`Error creating new group: ${error}`)
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          // If the user is an Educator display the create group modal 
          (action === 'Educator') ?
            (
              <form onSubmit={handleSubmission}>
                <div>
                  <label htmlFor="groupName">
                    <strong>Group Name</strong>
                    <input
                      type="text"
                      placeholder="Enter Group Name"
                      name="groupName"
                      onChange={(groupName) => setGroupName(groupName.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="description">
                    <strong>Description of the Group</strong>
                    <input
                      type="text"
                      placeholder="Enter Group Description"
                      name="groupName"
                      onChange={(description) => setDescription(description.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label htmlFor="joinCode">
                    <strong>Group Join Code</strong>
                    <input
                      type="text"
                      placeholder="Enter the Join Code"
                      name="groupName"
                      onChange={(joinCode) => setjoinCode(joinCode.target.value)}
                    />
                  </label>
                </div>
              </form>
            ) :
            (
              // If the user is a Student, display the join user modal
              <form onSubmit={handleSubmission}>
                <div>
                  <label htmlFor="joinCode">
                    <strong>Join Code</strong>
                    <input
                      type="text"
                      placeholder="Enter the Join code"
                      name="joinCode"
                      onChange={(joinCode) => setjoinCode(joinCode.target.value)}
                    />
                  </label>
                </div>
              </form>
            )
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmission}>
          {
            (action === 'Educator') ? (
              'Create Group'
            ) : (
              'Join Group'
            )
          }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default GroupActionModal