import React from 'react'

const TaskCard = ({ taskData, studentAssignments, onClick }) => {
  if (!taskData) return null

  const assignedStudents =
    taskData.task?.progress &&
    Object.values(taskData.task.progress)
      .map(({ student }) => studentAssignments[student])
      .filter(Boolean)

  return (
    <div className='task-card' onClick={onClick}>
      <div className='task-title-div'>
        <h3>{taskData.task.title}</h3>
      </div>
      <div className='task-info-div'>
        {
          taskData?.task?.progress[0]?.completed ? (
            <div className='individual-completed-task-div'>
              <h3 className='fix-header-margin'>Completed</h3>
            </div>
          ) : (
            <div id='time-weight-div'>
              <div className='estimation-div'>
                <p><strong>Time</strong></p>
                <p className='estimation-value-p'>{taskData.task.estimatedTime} hours</p>
              </div>
              <div className='estimation-div'>
                <p><strong>Difficulty</strong></p>
                <p className='estimation-value-p'>{taskData.task.taskWeight} out of 10</p>
              </div>
            </div>
          )
        }

        <div className='assignee-div'>
          <p><strong>Assigned To:</strong> {assignedStudents.length > 0 ? assignedStudents.join(', ') : 'No one assigned'}</p>
        </div>

        <div className='description'>
          <p><strong>Description:</strong> {taskData.task.description}</p>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
