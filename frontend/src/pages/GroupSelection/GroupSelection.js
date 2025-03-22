// the page that student users are taken to after signing in
import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import GroupDisplayComponent from '../../components/GroupDisplayComponent/GroupDisplayComponent.js'
import * as GroupService from '../../services/groupServices.js'



export default function GroupSelection() {
  const { studentId } = useParams()

  const [groups, setGroups] = useState([])

  useEffect(() => {
    const fetchStudentGroups = async () => {
      try {
        const groups = await GroupService.getStudentGroups(studentId)
        const retrievedGroups = groups ? groups.data.result : []
        setGroups(retrievedGroups)
      } catch (error) {
        console.log(`Error fetching student groups: ${error}`)
      }
    }
    fetchStudentGroups()
  }, [])


  return (
    <>
      <div className='join-group-div'>
        <GroupDisplayComponent groups={groups} userRole={'Student'} studentId={studentId} />
      </div>
    </>
  )
}
