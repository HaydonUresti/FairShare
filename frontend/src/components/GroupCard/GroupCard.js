import React, { useEffect, useState } from 'react'
import { getUserById } from '../../services/userService.js'

const GroupCard = ({ group, isInitialCard, onClick }) => {
  const [memberNames, setNames] = useState([])  // Store member names for each group
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!group?.members || group.members.length === 0) {
      setLoading(false)
      return
    }

    const fetchUserNames = async () => {
      try {
        const memberNames = await Promise.all(
          group.members.map(async (memberId) => {
            const member = await getUserById(memberId)
            return member.name
          })
        )
        setNames(memberNames) // Set member names for the current group
      } catch (error) {
        console.error(`Error fetching user names: ${error}`)
      } finally {
        setLoading(false)
      }
    }

    fetchUserNames()
  }, [group?.members])  // Dependency on group.members to ensure it fetches for the right group

  if (loading) return <p>Loading members...</p>

  return (
    <div className={`group-card ${isInitialCard ? 'create-group' : ''}`} onClick={onClick}>
      {isInitialCard ? (
        // Check if this is for an Educator or a Student
        group === 'Educator' ? (
          <h3>+ Create New Group</h3>
        ) : (
          <h3>+ Join New Group</h3>
        )
      ) : (
        <>
          <h3>{group.groupName}</h3>
          <p>Members: {memberNames.length > 0 ? memberNames.join(', ') : 'No members'}</p>
        </>
      )}
    </div>
  )
}

export default GroupCard
