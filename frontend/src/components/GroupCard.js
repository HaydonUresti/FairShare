import React, { useEffect, useState } from 'react'
import { getUserById } from '../services/userService.js'


const GroupCard = ({ group, isCreateNew, onClick }) => {
  const [memberNames, setNames] = useState([])
  const [loading, setLoading] = useState(true)
  // loading is set to true so that the component can handle not having 
  // the data at the time of loading as it is async


  useEffect(() => {
    if (!group?.members || group.members.length === 0) {
      setLoading(false); // Ensure the loading state is updated
      return;
    }
  
    const fetchUserNames = async () => {
      try {
        const memberNames = await Promise.all(
          group.members.map(async (memberId) => {
            const member = await getUserById(memberId);
            return member.name;
          })
        );
        setNames(memberNames);
      } catch (error) {
        console.error("Error fetching user names:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserNames();
  }, [group?.members]); // Re-run when members change

  if (loading) return <p>Loading members...</p>

  return (
    <div className={`group-card ${isCreateNew ? 'create-group' : ''}`} onClick={onClick}>
      {isCreateNew ? (
        <h3>+ Create New Group</h3>
      ) : (
        <>
          {/* fix this with correct attributes */}
          <h3>{group.groupName}</h3>
          <p>Description: {group.description}</p>
          <p>Members: {memberNames}</p>
        </>
      )}
    </div>
  )
}

export default GroupCard