import React from 'react'

const IndividualTaskCard = ({ taskData, isEven, onClick }) => {
  if (!taskData) return null


  return (
    <div className={`${isEven ? "even-task" : "odd-task"}`} onClick={onClick}>
      <div
        className={`individual-task-card ${isEven ? "even-task" : "odd-task"}`}
        onClick={onClick}
      >
        {
          taskData?.task?.progress[0]?.completed &&  
          <>
            <div className='individual-completed-task-div'>
              <h3 className='fix-header-margin'>Completed</h3>
            </div>
          </>
        }
        <div className='individual-task-title-div'>
          <h4 className='fix-header-margin'>{taskData?.task?.title}</h4>
        </div>
        <div className='individual-estimation-div'>
          <p className='individual-task-info-p'><strong>Time: </strong> </p>
          <p className='individual-task-info-p'>{taskData?.task?.estimatedTime} hours</p>
        </div>
        <div className='individual-estimation-div'>
          <p className='individual-task-info-p'><strong>Logged Time: </strong> </p>
          <p className='individual-task-info-p'>{taskData?.task?.progress[0]?.timeWorked || 0} hours</p>
        </div>
        <div className='individual-estimation-div'>
          <p className='individual-task-info-p'><strong>Weight:</strong> </p>
          <p className='individual-task-info-p'>{taskData?.task?.taskWeight} out of 10</p>
        </div>
        <div className='individual-description'>
          <p className='individual-task-info-p'><strong>Description:</strong> {taskData?.task?.description}</p>
        </div>
      </div>
    </div>
  )
}

export default IndividualTaskCard
