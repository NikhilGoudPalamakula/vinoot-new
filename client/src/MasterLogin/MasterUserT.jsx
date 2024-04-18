import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MasterUserT = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    const toggleActiveState = async (id, isActive) => {
      try {
        const updatedBy = localStorage.getItem('username'); // Get username from localStorage
        await axios.patch(`http://localhost:5000/api/users/${id}`, { isActive: !isActive, updatedBy });
        // Refresh user list after updating active state
        fetchUsers();
      } catch (error) {
        console.error('Error updating active state:', error);
      }
    };
  return (
    <>
      <div>
      <h2>Master User List</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>User Type</th>
            <th>Active</th>
            <th>Changed By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.dateOfBirth}</td>
              <td>{user.gender}</td>
              <td>{user.userType}</td>
              <td>{user.isActive ? 'Active' : 'Inactive'}</td>
              <td>{user.activeChangedBy}</td> 
              <td>

                <button onClick={() => toggleActiveState(user._id, user.isActive)}>
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> 
    </>
  )
}

export default MasterUserT
