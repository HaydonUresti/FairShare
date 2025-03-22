import React from 'react'

const GroupMemberCard = ({ studentData, onClick, studentView }) => {
  onClick = onClick ? onClick : () => { }

  return (
    <div className={`group-member-card ${studentView ? 'student-selection-member-card' : ''}`} onClick={() => onClick(studentData)}>
      <h3>{studentData.memberName}</h3>
      <div className='group-member-data-div'>
        <p><strong>Time Worked: </strong>{studentData.totalTimeWorked} hours</p>
        <p><strong># of Assigned Tasks: </strong>{Object.keys(studentData.assignedTasks).length}</p>
        <p><strong># of Completed Tasks: </strong>{Object.keys(studentData.tasksCompleted).length}</p>
        <p><strong>Task Points Completed: </strong>{studentData.taskPointsCompleted}</p>
      </div>
    </div>
  )
}

export default GroupMemberCard
