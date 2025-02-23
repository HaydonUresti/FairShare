import React, { useEffect, useState } from 'react'
import { getUserById } from '../../services/userService.js'

const GroupMemberCard = ({ studentData, onClick }) => {
  const [memberName, setNames] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!studentData.id) {
      setLoading(false)
      return
    }

    const fetchUserName = async () => {
      try {
        const student = await getUserById(studentData.id)
        console.log(`setting ${studentData.id}`)
        setNames(student.name)
      } catch (error) {
        console.error(`Error fetching user names: ${error}`)
      } finally {
        setLoading(false)
      }
    }

    fetchUserName()
  }, [studentData])

  if (loading) return <p>Loading members...</p>

  return (
    <div className={'group-member-card'}>
      <h3>{memberName}</h3>
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
