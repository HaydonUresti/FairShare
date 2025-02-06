import React from 'react'

const TaskCard = ({taskData}) => {

  return (
    <div className='task-card'>
      <h1>{taskData.title}</h1>
    </div>
  )
}

export default TaskCard