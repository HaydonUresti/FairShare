import React, { useState } from "react"
import GroupCard from './GroupCard.js'
import GroupModal from './GroupModal.js'
import CreateGroupModal from './CreateGroupModal.js'


const EducatorGroupDisplay = ({ groups }) => {
  

  const [showGroupModal, setShowGroupModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCardClick = (group) => {
    if (group === 'create') {
      setShowCreateModal(true)
    } else {
      setSelectedGroup(group)
      setShowGroupModal(true)
    }
  }


  return (
    <div className="group-container">
      {/* "Create New Group" card */}
      <GroupCard isCreateNew onClick={() => handleCardClick("create")} />

      {/* Render each group card */}
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} onClick={() => handleCardClick(group)} />
      ))}

      {/* The Group Details Modal */}
      <GroupModal
        show={showGroupModal}
        onHide={() => setShowGroupModal(false)}
        title={selectedGroup?.groupName}
        content={`Description: ${selectedGroup?.description}`}
        onSave={() => {
          console.log('Saving changes for:', selectedGroup)
          setShowGroupModal(false)
        }}
      />

      {/* The Create New Group Modal */}
      <CreateGroupModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSave={(newGroupData) => {
          console.log('Creating new group:', newGroupData)
          setShowCreateModal(false)
        }}
      />
    </div>
  )
}

export default EducatorGroupDisplay