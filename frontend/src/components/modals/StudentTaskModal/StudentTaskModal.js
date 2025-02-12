import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { updateTask } from '../../../services/taskService.js'

const StudentTaskModal = ({ show, onHide, taskData, studentsAssigned, onSave, userRole }) => {
  const currentStudent = localStorage.getItem('userId')
  const taskId = taskData?.task?._id

  const handleStartTask = async () => {
    const updateBody = {
      "progress": [
        {
          "student": currentStudent,
          "notes": taskData?.task?.progress[0]?.notes,
          "completed": taskData?.task?.progress[0]?.completed,
          "timeWorked": taskData?.task?.progress[0]?.timeWorked
        }
      ]
    }
    await updateTask(taskId, updateBody)
    window.location.reload()
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
      <Modal.Header className="modal-header-style" closeButton>
        <Modal.Title>{taskData?.task?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='task-info-div'>
          <div className='task-info-div'>
            <div id='time-weight-div'>
              <div className='estimation-div'>
                <p><strong>Time</strong></p>
                <p className='estimation-value-p'>{taskData?.task?.estimatedTime} hours</p>
              </div>
              <div className='estimation-div'>
                <p><strong>Difficulty</strong></p>
                <p className='estimation-value-p'>{taskData?.task?.taskWeight} out of 10</p>
              </div>
            </div>

            {/* Assigned To Section */}
            <div className='assignee-div'>
              <p><strong>Assigned To: </strong>
                {!studentsAssigned
                  ? 'Loading...'
                  : Object.values(studentsAssigned).length > 0
                    ? Object.values(studentsAssigned).join(', ')
                    : 'No one assigned'}
              </p>
            </div>

            <div className='description'>
              <p><strong>Description:</strong> {taskData?.task?.description}</p>
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>

        {
          !taskData?.task?.progress[0]?.student ? (
            <Button variant='primary' onClick={() => handleStartTask()}>Start Task</Button>
          ) : taskData?.task?.progress[0].student === currentStudent ? (
            <Button variant='warning' onClick={() => handleStopTask()}>Stop Task</Button>
          ) : null
        }
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal >
  )
}

export default StudentTaskModal