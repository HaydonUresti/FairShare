import React from 'react'

const TaskCard = ({ taskData }) => {
  if (!taskData) return null

  return (
    <div className='task-card'>
      <div className='task-title-div'>
        <h3>{taskData.task.title}</h3>
      </div>
      <div className='task-info-div'>
        <div id='time-weight-div'>
          <div className='estimation-div'>
            <p><strong>Time</strong></p>
            <p className='estimation-value-p'>{taskData.task.estimatedTime} hours</p>
          </div>
          <div className='estimation-div'>
            <p><strong>Weight</strong></p>
            <p className='estimation-value-p'>{taskData.task.taskWeight} out of 10</p>
          </div>
        </div>
        <div className='assignee-div'>
          <p><strong>Assigned To:</strong> figure this out!
          {

          }
          </p>
        </div>
        <div className='description'>
          <p><strong>Description:</strong> {taskData.task.description}</p>
        </div>
      </div>
    </div>
  )
}

export default TaskCard