// The page that educator users are taken to after signing in
import React, { useEffect, useState } from 'react'
import * as GroupService from '../services/groupServices.js'
import GroupDisplayComponent from '../components/GroupDisplayComponent.js'

export default function EducatorDashboard() {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await GroupService.getEducatorGroups()
        console.log('Groups:', response.data.groups)
        const retrievedGroups = response ? response.data : []
        setGroups(retrievedGroups)
      } catch (error) {
        console.error('Error fetching groups:', error)
      }
    }
    fetchGroups()
  }, [])


  return (
    <>
      <div className="hero-div"><h1>Educator Dashboard</h1>
        <GroupDisplayComponent groups={groups} userRole={'Educator'} />
      </div>
    </>
  )
}


