// The page that educator users are taken to after signing in
import React, { useEffect, useState } from 'react'
import * as GroupService from '../../services/groupServices.js'

import GroupDisplayComponent from '../../components/GroupDisplayComponent/GroupDisplayComponent.js'
import TaskDrawer from '../../components/TaskDrawer/TaskDrawer.js'
import UpdateTaskModal from '../../components/modals/UpdateTaskModal/UpdateTaskModal.js'
import CreateTaskModal from '../../components/modals/CreateTaskModal/CreateTaskModal.js'
import GroupMemberCard from '../../components/GroupMemberCard/GroupMemberCard.js'

import { getTaskById } from '../../services/taskService.js'
import { retrieveSummary } from '../../services/summaryService.js'

export default function EducatorDashboard() {
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedUpdateTask, setSelectedUpdateTask] = useState()
  const [selectedTaskStudent, setSelectedTaskStudent] = useState()
  const [groupMemberData, setGroupMemberData] = useState()
  const [groupSummary, setGroupSummary] = useState()
  const [studentSummary, setStudentSummary] = useState()
  const [viewSelection, setViewSelection] = useState('Group View') // set to false when in student view
  const [selectedStudent, setSelectedStudent] = useState()


  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await GroupService.getEducatorGroups()
        console.log('Groups:', response.data.groups)
        const retrievedGroups = response ? response.data : []
        setSelectedGroup(response?.data[0])
        setGroups(retrievedGroups)
      } catch (error) {
        console.error(`Error fetching groups: ${error}`)
      }
    }
    fetchGroups()
  }, [])

  useEffect(() => {
    if (!selectedGroup) return

    const fetchTasks = async () => {
      try {
        const groupTasks = await Promise.all(selectedGroup.tasks.map(getTaskById))
        setTasks(groupTasks)

        // set other states to default
        setSelectedStudent(undefined)
        setStudentSummary(undefined)
        setGroupSummary(undefined)

      } catch (error) {
        console.error(`Error fetching group tasks: ${error}`)
      } finally {
        setLoading(false)
      }
    }
    fetchTasks()

  }, [selectedGroup])

  useEffect(() => {
    if (!tasks || tasks.length === 0 || !selectedGroup) return;
    const fetchTaskData = async () => {
      try {
        const data = await GroupService.getGroupMemberContributions(tasks, selectedGroup?.members);
        setGroupMemberData(data)
      } catch (error) {
        console.error(`Error fetching member data: ${error}`)
      }
    }
    fetchTaskData()
  }, [tasks, selectedGroup])

  useEffect(() => {
    if (!groupMemberData || groupMemberData.length === 0 || !selectedGroup || viewSelection !== 'Group View') return

    const fetchGroupSummary = async () => {
      try {
        const summary = await retrieveSummary(selectedGroup?._id, groupMemberData)
        setGroupSummary(summary)
      } catch (error) {
        console.error(`Error fetching member data: ${error}`)
      }
    }
    fetchGroupSummary()
  }, [groupMemberData, selectedGroup])

  useEffect(() => {
    if (!groupMemberData || groupMemberData.length === 0 || !selectedStudent || !selectedGroup || viewSelection !== 'Student View') return

    const fetchStudentSummary = async () => {
      try {
        const summary = await retrieveSummary(selectedGroup?._id, selectedStudent, selectedStudent?.id)
        setStudentSummary(summary)
      } catch (error) {
        console.error(`Error fetching member data: ${error}`)
      }
    }
    fetchStudentSummary()
  }, [selectedStudent])

  const handleGroupSelect = (group) => {
    setSelectedGroup(group)
    console.log('Selected Group:', group)
  }

  const handleDeleteGroup = async (e) => {
    e.preventDefault()
    try {
      await GroupService.deleteGroup(selectedGroup?._id)
      console.log('Successfully deleted the group')
      window.location.reload()
    } catch (error) {
      console.log(`Error deleting group: ${error}`)
    }
  }

  const handleOpenUpdateModal = (task, studentName) => {
    setSelectedUpdateTask(task)
    setSelectedTaskStudent(studentName)
    setShowUpdateModal(true)
  }

  const handleOpenCreateModal = () => {
    setShowCreateModal(true)
  }

  const handleViewChange = (e) => {
    if (e.target.value === 'Group View') {
      setViewSelection('Group View')
    } else {
      setViewSelection('Student View')
    }
  }

  const handleSelectStudent = (member) => {
    setSelectedStudent(member)
  }

  return (
    <>
      <div className='educator-dashboard'>
        <div className='educator-group-display'>
          <GroupDisplayComponent
            groups={groups}
            userRole={'Educator'}
            onGroupSelect={handleGroupSelect}
          />
        </div>
        {viewSelection === 'Group View' ? (
          <>
            <div className='main-educator-content-div'>
              {selectedGroup ? (
                <>
                  <div className='educator-top-div'>

                    <div className='data-view-selection-div'>
                      <select className='view-selection' value={viewSelection} onChange={handleViewChange}>
                        <option value='Group View'>Group View</option>
                        <option value='Student View'>Student View</option>
                      </select>
                    </div>
                    <div className='delete-button-div'>
                      <button type='button' className='group-deletion-button' onClick={handleDeleteGroup}>Delete Group</button>
                    </div>

                  </div>

                  <div className='data-view'>
                    <h1>{selectedGroup?.groupName}</h1>
                    <h3>Group Join Code</h3>
                    <p><strong>{selectedGroup?.joinCode}</strong></p>
                    <h4>Smart Progress Update</h4>
                    <div className='ai-description-div'>
                      <p>{groupSummary}</p>
                    </div>
                  </div>
                  <div className='educator-task-div'>
                    <h3>{selectedGroup?.groupName}'s Tasks</h3>
                    <div className='create-task-card' onClick={handleOpenCreateModal}>
                      <hr className='create-task-hr'></hr>
                      <h5>+ Create a new task</h5>
                    </div>
                    {
                      tasks.length > 0 ? (
                        tasks.map((task) => (
                          <TaskDrawer taskData={task} handleModal={handleOpenUpdateModal} groupId={selectedGroup?._id} />
                        ))
                      ) : (
                        <p>No tasks created yet</p>
                      )
                    }
                  </div>
                  <div className='dashboard-members-div'>
                    <h3>Group Members</h3>

                    <div className='group-member-card-div'>
                      {
                        groupMemberData && Object.keys(groupMemberData).length > 0 ? (
                          groupMemberData.map((member, index) => (
                            <GroupMemberCard key={index} studentData={member} />
                          ))
                        ) : (
                          <p>No students are in the group yet</p>
                        )
                      }
                    </div>
                  </div>

                </>
              ) : (
                <h1>Create a group to view group details</h1>
              )}
            </div>
          </>
        ) : (
          <>
            <>
              <div className='main-educator-content-div'>
                {selectedGroup ? (
                  <>
                    <div className='educator-top-div'>

                      <div className='data-view-selection-div'>
                        <select className='view-selection' value={viewSelection} onChange={handleViewChange}>
                          <option value='Group View'>Group View</option>
                          <option value='Student View'>Student View</option>
                        </select>
                      </div>
                      <div className='delete-button-div'>
                        <button type='button' className='group-deletion-button' onClick={handleDeleteGroup}>Delete Group</button>
                      </div>

                    </div>

                    <div className='dashboard-members-div'>
                      <h3>Group Members</h3>

                      <div className='group-member-card-div'>
                        {
                          groupMemberData && Object.keys(groupMemberData).length > 0 ? (
                            groupMemberData.map((member, index) => (
                              <GroupMemberCard key={index} studentData={member} onClick={() => handleSelectStudent(member)} />
                            ))
                          ) : (
                            <p>No students are in the group yet</p>
                          )
                        }
                      </div>
                    </div>

                    <div className='data-view below-member-cards'>
                      <h2>{selectedStudent?.memberName || 'No student selected'}</h2>
                      <h4>Smart Progress Update</h4>
                      <div className='student-data-view'>

                      </div>
                      <div className='ai-description-div'>
                        <p>{studentSummary || 'Summary is currently unavailable'}</p>
                      </div>
                      <div className='educator-task-div-student-view'>
                        <h3>{selectedStudent ? `${selectedStudent?.memberName}'s Tasks` : 'No student selected'}</h3>
                        {
                          selectedStudent?.assignedTasks.length > 0 ? (
                            selectedStudent?.assignedTasks.map((task) => (
                              <TaskDrawer taskData={task} handleModal={handleOpenUpdateModal} groupId={selectedGroup?._id} />
                            ))
                          ) : (
                            <p>{selectedStudent ? `No tasks assigned to ${selectedStudent?.memberName} yet` : 'No student selected'}</p>
                          )
                        }
                      </div>
                    </div>
                  </>
                ) : (
                  <h1>Create a group to view group details</h1>
                )}
              </div>
            </>
          </>
        )}

      </div>

      <UpdateTaskModal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        taskData={selectedUpdateTask}
        studentsAssigned={selectedTaskStudent}
      />

      <CreateTaskModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        groupId={selectedGroup?._id}
      />
    </>
  )
}

