// The page that educator users are taken to after signing in
import React, { useEffect, useState } from 'react'
import * as GroupService from '../../services/groupServices.js'

import GroupDisplayComponent from '../../components/GroupDisplayComponent/GroupDisplayComponent.js'
import TaskDrawer from '../../components/TaskDrawer/TaskDrawer.js'
import UpdateTaskModal from '../../components/modals/UpdateTaskModal/UpdateTaskModal.js'

import { getUserById } from '../../services/userService.js'
import { getTaskById } from '../../services/taskService.js'

export default function EducatorDashboard() {
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [memberNames, setNames] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedUpdateTask, setSelectedUpdateTask] = useState()
  const [selectedTaskStudent, setSelectedTaskStudent] = useState()

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
      } catch (error) {
        console.error(`Error fetching group tasks: ${error}`)
      } finally {
        setLoading(false)
      }
    }

    const fetchUserNames = async () => {
      try {
        const memberNames = await Promise.all(
          selectedGroup.members.map(async (memberId) => {
            const member = await getUserById(memberId)
            return member.name
          })
        )
        setNames(memberNames)
      } catch (error) {
        console.error(`Error fetching user names: ${error}`)
      } finally {
        setLoading(false)
      }
    }
    fetchUserNames()
    fetchTasks()
  }, [selectedGroup])

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

  return (
    <>
      <div className='educator-dashboard'>
        <div className="educator-group-display">
          <GroupDisplayComponent
            groups={groups}
            userRole={'Educator'}
            onGroupSelect={handleGroupSelect}
          />
        </div>
        <div className='main-educator-content-div'>
          {selectedGroup ? (
            <>
              <div className='educator-top-div'>

                <div className='data-view-selection-div'>
                  <select>
                    <option value='groupView'>Group View</option>
                    <option value='studentView'>Student View</option>
                  </select>
                </div>
                <div className='delete-button-div'>
                  <button type='button' className='group-deletion-button' onClick={handleDeleteGroup}>Delete Group</button>
                </div>

              </div>
              <div className='data-view'>
                <h1>{selectedGroup?.groupName}</h1>
                <h3>Group Members</h3>
                {
                  <p>Members: {memberNames.length > 0 ? memberNames.join(', ') : 'No members'}</p>
                }

                <div className='ai-description'>
                  <h4>Progress Update</h4>
                  <p>Description from GPT</p>
                </div>
              </div>
              <div className='educator-task-div'>
                <h3>{selectedGroup?.groupName}'s Tasks</h3>
                <div className='create-task-card' onClick={handleOpenUpdateModal}>
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

            </>
          ) : (
            <h1>Create a group to view group details</h1>
          )}

        </div>
      </div>

      <UpdateTaskModal
        show={showUpdateModal}
        onHide={() => setShowUpdateModal(false)}
        taskData={selectedUpdateTask}
        studentsAssigned={selectedTaskStudent}
      />
    </>
  )
}

