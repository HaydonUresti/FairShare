import React from "react"
import { getUserById } from '../services/userService.js'
// TO DO: 
// have this display the user's name instead of their number

const GroupCard = ({ group, isCreateNew, onClick }) => {
  return (
    <div className={`group-card ${isCreateNew ? 'create-group' : ''}`} onClick={onClick}>
      {isCreateNew ? (
        <h3>+ Create New Group</h3>
      ) : (
        <>
          {/* fix this with correct attributes */}
          <h3>{group.groupName}</h3>
          <p>Description: {group.description}</p>
          <p>Members: {group.members}</p>
        </>
      )}
    </div>
  )
}

export default GroupCard