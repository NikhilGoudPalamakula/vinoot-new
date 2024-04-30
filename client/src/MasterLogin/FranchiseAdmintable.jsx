import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FranchiseAdmintable = () => {
    const [admins, setAdmins] = useState([]);

   
    useEffect(() => {
      fetchAdmins();
    }, []);
  
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/franchisefetchAdmin');
        // Filter admins whose designation is "FranchiseAdmin"
        const filteredAdmins = response.data.filter(admin => admin.designation === "FranchiseAdmin");
        setAdmins(filteredAdmins);
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


    return (
      <div>
        <Link to='/fsr'><button>franchise staff Registration</button></Link>
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
                <td>{admin.username}</td>
                <td>{admin.Adminid}</td>
                <td>{admin.franchisename}</td>
                <td>{admin.FranchiseID}</td>
                <td>{admin.designation}</td>
                <td>{admin.email}</td>
                <td>{admin.password}</td>
                <td>{admin.isActive ? 'Active' : 'Inactive'}</td>
                <td>

<button onClick={() => toggleActiveState(admin._id, admin.isActive)}>
  {admin.isActive ? 'Deactivate' : 'Activate'}
</button>
</td>
                <td>{admin.modifiedBy}</td>
                <td>{admin.modifiedAt}</td>
                <td>{admin.createdAt}</td>
                <td>{admin.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

export default FranchiseAdmintable;

