import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MasterUserT = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    const toggleActiveState = async (id, isActive) => {
      try {
        const updatedBy = localStorage.getItem('username'); // Get username from localStorage
        await axios.patch(`http://localhost:5001/api/users/${id}`, { isActive: !isActive, updatedBy });
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
              <td>{user.modifiedBy}</td> 
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



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MasterUserT = () => {
//   const [users, setUsers] = useState([]);
//   const [editUser, setEditUser] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:5001/api/users');
//       setUsers(response.data);
//     } catch (error) {
//       console.error('Error fetching users:', error);
//     }
//   };

//   const toggleActiveState = async (id, isActive) => {
//     try {
//       const updatedBy = localStorage.getItem('username');
//       await axios.patch(`http://localhost:5001/api/users/${id}`, { isActive: !isActive, updatedBy });
//       fetchUsers();
//     } catch (error) {
//       console.error('Error updating active state:', error);
//     }
//   };

//   const handleEdit = (user) => {
//     setEditUser({ ...user });
//   };

//   const handleSaveEdit = async () => {
//     try {
//       await axios.patch(`http://localhost:5001/api/users/${editUser._id}`, editUser);
//       setUsers(users.map(u => u._id === editUser._id ? editUser : u));
//       setEditUser(null);
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5001/api/users/${id}`);
//       fetchUsers();
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditUser(prevEditUser => ({
//       ...prevEditUser,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       <h2>Master User List</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Full Name</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Phone Number</th>
//             <th>Date of Birth</th>
//             <th>Gender</th>
//             <th>User Type</th>
//             <th>Active</th>
//             <th>Changed By</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map(user => (
//             <tr key={user._id}>
//               <td>
//                 {editUser && editUser._id === user._id ? (
//                   <input type="text" name="fullName" value={editUser.fullName} onChange={handleInputChange} />
//                 ) : (
//                   user.fullName
//                 )}
//               </td>
//               <td>
//                 {editUser && editUser._id === user._id ? (
//                   <input type="text" name="username" value={editUser.username} onChange={handleInputChange} />
//                 ) : (
//                   user.username
//                 )}
//               </td>
//               <td>
//                 {editUser && editUser._id === user._id ? (
//                   <input type="email" name="email" value={editUser.email} onChange={handleInputChange} />
//                 ) : (
//                   user.email
//                 )}
//               </td>
//               <td>
//                 {editUser && editUser._id === user._id ? (
//                   <input type="text" name="phoneNumber" value={editUser.phoneNumber} onChange={handleInputChange} />
//                 ) : (
//                   user.phoneNumber
//                 )}
//               </td>
//               <td>
//                 {editUser && editUser._id === user._id ? (
//                   <input type="date" name="dateOfBirth" value={editUser.dateOfBirth} onChange={handleInputChange} />
//                 ) : (
//                   user.dateOfBirth
//                 )}
//               </td>
//               <td>
//                 {editUser && editUser._id === user._id ? (
//                   <input type="text" name="gender" value={editUser.gender} onChange={handleInputChange} />
//                 ) : (
//                   user.gender
//                 )}
//               </td>
//               <td>
//                 {editUser && editUser._id === user._id ? (
//                   <input type="text" name="userType" value={editUser.userType} onChange={handleInputChange} />
//                 ) : (
//                   user.userType
//                 )}
//               </td>
//               <td>{user.isActive ? 'Active' : 'Inactive'}</td>
//               <td>{user.activeChangedBy}</td>
//               <td>
//                 {editUser && editUser._id === user._id ? (
//                   <button onClick={handleSaveEdit}>Save</button>
//                 ) : (
//                   <button onClick={() => handleEdit(user)}>Edit</button>
//                 )}
//                 <button onClick={() => toggleActiveState(user._id, user.isActive)}>
//                   {user.isActive ? 'Deactivate' : 'Activate'}
//                 </button>
//                 <button onClick={() => handleDelete(user._id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MasterUserT;
