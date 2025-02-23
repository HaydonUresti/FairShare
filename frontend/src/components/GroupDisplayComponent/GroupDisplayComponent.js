import React, { useState } from "react"
import GroupCard from '../GroupCard/GroupCard.js'
import GroupModal from '../modals/GroupModal/GroupModal.js'
import GroupActionModal from '../modals/GroupActionModal.js'


const GroupDisplayComponent = ({ groups, userRole, onGroupSelect }) => {

  const [showGroupModal, setShowGroupModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [showCreateOrJoinModal, setShowCreateOrJoinModal] = useState(false)

  const handleCardClick = (group) => {
    if (['Educator', 'Student'].includes(group)) {
      setShowCreateOrJoinModal(true)
    } else {
      setSelectedGroup(group)
      setShowGroupModal(true)
    }
  }


  return (
    <div className={userRole === 'Educator' ? 'group-container' : 'student-group-container'}>
      {/* "Create New Group" card */}
      <GroupCard isInitialCard group={userRole} onClick={() => handleCardClick(userRole)} />

      {/* Render each group card */}
      {groups.map((group) => (
        userRole === 'Educator' ? (
          <GroupCard key={group.id} group={group} onClick={() => onGroupSelect(group)} />
        ) : (
          <GroupCard key={group.id} group={group} onClick={() => handleCardClick(group)} />
        )
      ))}

      {/* The Group Details Modal */}
      <GroupModal
        show={showGroupModal}
        onHide={() => setShowGroupModal(false)}
        title={selectedGroup?.groupName}
        content={selectedGroup}
        onSave={() => {
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