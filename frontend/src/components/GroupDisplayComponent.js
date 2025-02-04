import React, { useState } from "react"
import GroupCard from './GroupCard.js'
import GroupModal from './GroupModal.js'
import GroupActionModal from './GroupActionModal.js'


const GroupDisplayComponent = ({ groups, userRole }) => {


  const [showGroupModal, setShowGroupModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [showCreateOrJoinModal, setShowCreateOrJoinModal] = useState(false)

  // const userRole = localStorage.getItem(userRole)

  const handleCardClick = (group) => {
    if (['Educator', 'Student'].includes(group)) {
      setShowCreateOrJoinModal(true)
    } else {
      setSelectedGroup(group)
      setShowGroupModal(true)
    }
  }


  return (
    <div className="group-container">
      {/* "Create New Group" card */}
      <GroupCard isInitialCard onClick={() => handleCardClick(userRole)} />

      {/* Render each group card */}
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} onClick={() => handleCardClick(group)} />
      ))}

      {/* The Group Details Modal */}
      <GroupModal
        show={showGroupModal}
        onHide={() => setShowGroupModal(false)}
        title={selectedGroup?.groupName}
        content={selectedGroup}
        onSave={() => {
          console.log('Saving changes for:', selectedGroup)
          setShowGroupModal(false)
        }}
        userRole={userRole}
      />

      {/* The Create New Group Modal */}
      <GroupActionModal
        show={showCreateOrJoinModal}
        onHide={() => setShowCreateOrJoinModal(false)}
        onSave={(newGroupData) => {
          console.log('Creating new group:', newGroupData)
          setShowCreateOrJoinModal(false)
        }}
        action={userRole}
      />
    </div>
  )
}


export default GroupDisplayComponent