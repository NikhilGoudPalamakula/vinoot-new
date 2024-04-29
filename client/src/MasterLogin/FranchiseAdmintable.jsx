// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const FranchiseAdmintable = () => {
//     const [admins, setAdmins] = useState([]);
   
//     useEffect(() => {
//       fetchAdmins();
//     }, []);
  
//     const fetchAdmins = async () => {
//       try {
//         const response = await axios.get('http://localhost:5001/api/franchisefetch'); // Adjust the route according to your backend
//         setAdmins(response.data);
//       } catch (error) {
//         console.error('Error fetching admins:', error);
//       }
//     };
  
//     const toggleActiveState = async (id, isActive) => {
//         try {
//           const updatedBy = localStorage.getItem('username'); // Get username from localStorage
//           await axios.patch(`http://localhost:5001/api/franchisestateupdate/${id}`, { isActive: !isActive, updatedBy });
//           // Refresh user list after updating active state
//           fetchAdmins();
//         } catch (error) {
//           console.error('Error updating active state:', error);
//         }
//       };


//     return (
//       <div>
//         <table>
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Admin ID</th>
//               <th>Franchise Name</th>
//               <th>Franchise ID</th>
//               <th>Designation</th>
//               <th>Email</th>
//               <th>Password</th>
//               <th>Is Active</th>
//               <th>Action</th>
//               <th>Modified By</th>
//               <th>Modified At</th>
//               <th>Created At</th>
//               <th>Created By</th>
//             </tr>
//           </thead>
//           <tbody>
//             {admins.map(admin => (
//               <tr key={admin._id}>
//                 <td>{admin.username}</td>
//                 <td>{admin.Adminid}</td>
//                 <td>{admin.franchisename}</td>
//                 <td>{admin.FranchiseID}</td>
//                 <td>{admin.designation}</td>
//                 <td>{admin.email}</td>
//                 <td>{admin.password}</td>
//                 <td>{admin.isActive ? 'Active' : 'Inactive'}</td>
//                 <td>

// <button onClick={() => toggleActiveState(admin._id, admin.isActive)}>
//   {admin.isActive ? 'Deactivate' : 'Activate'}
// </button>
// </td>
//                 <td>{admin.modifiedBy}</td>
//                 <td>{admin.modifiedAt}</td>
//                 <td>{admin.createdAt}</td>
//                 <td>{admin.createdBy}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

// export default FranchiseAdmintable;



import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FranchiseAdmintable = () => {
    const [admins, setAdmins] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editedData, setEditedData] = useState({});
   
    useEffect(() => {
      fetchAdmins();
    }, []);
  
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/franchisefetch');
        setAdmins(response.data);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };
  
    const toggleActiveState = async (id, isActive) => {
        try {
          const updatedBy = localStorage.getItem('username');
          await axios.patch(`http://localhost:5001/api/franchisestateupdate/${id}`, { isActive: !isActive, updatedBy });
          fetchAdmins();
        } catch (error) {
          console.error('Error updating active state:', error);
        }
    };

    const deleteAdmin = async (id) => {
        try {
          await axios.delete(`http://localhost:5001/api/deleteFranchiseAdmin/${id}`);
          fetchAdmins();
        } catch (error) {
          console.error('Error deleting admin:', error);
        }
    };

    const toggleEditMode = (id) => {
        setEditId(id);
    };

    const handleInputChange = (e, key, id) => {
        // Create a copy of the edited data object
        const updatedDataCopy = { ...editedData };
        // Update the value of the specific key for the admin being edited
        updatedDataCopy[id] = { ...updatedDataCopy[id], [key]: e.target.value };
        // Set the updated data
        setEditedData(updatedDataCopy);
    };

    const saveEditedData = async (id) => {
        try {
            await axios.patch(`http://localhost:5001/api/updateFranchiseAdmin/${id}`, editedData[id]);
            setEditId(null);
            // Clear the edited data for the admin after saving
            setEditedData({ ...editedData, [id]: {} });
            fetchAdmins();
        } catch (error) {
            console.error('Error updating admin:', error);
        }
    };

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Admin ID</th>
              <th>Franchise Name</th>
              <th>Franchise ID</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Password</th>
              <th>Is Active</th>
              <th>Action</th>
              <th>Modified By</th>
              <th>Modified At</th>
              <th>Created At</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin._id}>
                <td>{editId === admin._id ? <input type="text" value={editedData[admin._id]?.username || admin.username} onChange={(e) => handleInputChange(e, 'username', admin._id)} /> : admin.username}</td>
                <td>{editId === admin._id ? (
                    <input
                      type="text"
                      value={editedData[admin._id]?.Adminid || admin.Adminid}
                      onChange={(e) => handleInputChange(e, 'Adminid', admin._id)}
                    />
                  ) : (
                    admin.Adminid
                  )}</td>
                <td>{editId === admin._id ? (
                    <input
                      type="text"
                      value={editedData[admin._id]?.franchisename || admin.franchisename}
                      onChange={(e) => handleInputChange(e, 'franchisename', admin._id)}
                    />
                  ) : (
                    admin.franchisename
                  )}
                  </td>
                <td>{editId === admin._id ? (
                    <input
                      type="text"
                      value={editedData[admin._id]?.FranchiseID || admin.FranchiseID}
                      onChange={(e) => handleInputChange(e, 'FranchiseID', admin._id)}
                    />
                  ) : (
                    admin.FranchiseID
                  )}</td>
                <td>
                {editId === admin._id ? (
                    <input
                      type="text"
                      value={editedData[admin._id]?.designation || admin.designation}
                      onChange={(e) => handleInputChange(e, 'designation', admin._id)}
                    />
                  ) : (
                    admin.designation
                  )}
                </td>
                <td>
                {editId === admin._id ? (
                    <input
                      type="text"
                      value={editedData[admin._id]?.email || admin.email}
                      onChange={(e) => handleInputChange(e, 'email', admin._id)}
                    />
                  ) : (
                    admin.email
                  )}
                </td>
                <td>
                {editId === admin._id ? (
                    <input
                      type="text"
                      value={editedData[admin._id]?.password || admin.password}
                      onChange={(e) => handleInputChange(e, 'password', admin._id)}
                    />
                  ) : (
                    admin.password
                  )}
                </td>
                <td>{admin.isActive ? 'Active' : 'Inactive'}</td>
                <td>
                  <button onClick={() => toggleActiveState(admin._id, admin.isActive)}>
                    {admin.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  {editId === admin._id ? (
                    <>
                      <button onClick={() => saveEditedData(admin._id)}>Save</button>
                      <button onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => toggleEditMode(admin._id)}>Edit</button>
                  )}
                  <button onClick={() => deleteAdmin(admin._id)}>Delete</button>
                </td>
                <td>{editId === admin._id ? (
                    <input
                      type="text"
                      value={editedData[admin._id]?.modifiedBy || admin.modifiedBy}
                      onChange={(e) => handleInputChange(e, 'modifiedBy', admin._id)}
                    />
                  ) : (
                    admin.modifiedBy
                  )}</td>
                <td>{editId === admin._id ? (
                    <input
                      type="text"
                      value={editedData[admin._id]?.modifiedAt || admin.modifiedAt}
                      onChange={(e) => handleInputChange(e, 'modifiedAt', admin._id)}
                    />
                  ) : (
                    admin.modifiedAt
                  )}</td>
                <td>{editId === admin._id ? (
                    <input
                      type="text"
                      value={editedData[admin._id]?.createdAt || admin.createdAt}
                      onChange={(e) => handleInputChange(e, 'createdAt', admin._id)}
                    />
                  ) : (
                    admin.createdAt
                  )}</td>
                <td>{editId === admin._id ? (
                    <input
                      type="text"
                      value={editedData[admin._id]?.createdBy || admin.createdBy}
                      onChange={(e) => handleInputChange(e, 'createdBy', admin._id)}
                    />
                  ) : (
                    admin.createdBy
                  )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default FranchiseAdmintable;
