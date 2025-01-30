import React from "react"
import { useNavigate } from 'react-router-dom'
import GroupCard from './GroupCard.js'

const EducatorGroupDisplay = ({ groups }) => {
  const navigate = useNavigate()

  // const handleGroupClick = (groupId) => {
  //   navigate(`/group/${groupId}`)
  // }

  return (
    <div className="group-container">
      <GroupCard isCreateNew onClick={() => navigate('/create-group')} />

      {groups.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  )
}

export default EducatorGroupDisplay