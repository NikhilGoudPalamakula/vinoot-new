
import "./FranchiseStaffReg.css";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import FranchiseadminSidebar from "../Franchiseadminsidebar/Franchiseadminsidebar";

const FranchiseStaffReg = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    fullname: "",
    userId: "",
    franchisename: "",
    FranchiseID: "",
    designation: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update adminData and franchiseData with the current values from state and localStorage
      const createdBy = localStorage.getItem("userId");
      const franchiseName = localStorage.getItem("franchisename");
      const FranchiseiD = localStorage.getItem("FranchiseID");
      // Update adminData
      const updatedAdminData = {
        ...adminData,
        franchisename: franchiseName,
        FranchiseID: FranchiseiD,
        createdBy: createdBy, // Add CreatedBy from localStorage
      };

      // Make the POST request with updated adminData
      await axios.post("http://localhost:5001/api/admin", updatedAdminData);
      console.log("admin Data:", updatedAdminData);

      alert("Data submitted successfully.");
      navigate("/FranchiseAdmin");
    } catch (error) {
      console.error("Failed to submit data", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  const handleAdminInputChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  // ---------------------fetching of staff---------------

  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);



  const fetchAdmins = async () => {
    try {
      const frid = localStorage.getItem('FranchiseID'); // Corrected localStorage key
      if (frid) {
        const response = await axios.get(`http://localhost:5001/api/franchisefetchusers/${frid}`);
        setAdmins(response.data);
      } else {
        console.error('FranchiseID not found in localStorage');
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };


  const toggleActiveState = async (id, isActive) => {
    try {
      const updatedBy = localStorage.getItem('username'); // Get username from localStorage
      await axios.patch(`http://localhost:5001/api/franchisestateupdate/${id}`, { isActive: !isActive, updatedBy });
      // Refresh user list after updating active state
      fetchAdmins();
    } catch (error) {
      console.error('Error updating active state:', error);
    }
  };


  return (
    <div className="fraddstaff-total">
      <div>
        <FranchiseadminSidebar />
      </div>

      <div className="fradmin-right">
        {/* <h2 className="addfr-franchise-from-Name">Franchise Form</h2> */}
        <form onSubmit={handleSubmit} className="fr-admin-form">
          <h2>Add Staff</h2>
          <div  className="fr-for-flex">
          <div>
          <div className="addfr-inputs-wraps">
            <input
              className="addfr-inputs"
              type="text"
              name="fullname"
              value={adminData.fullname}
              onChange={handleAdminInputChange}
              placeholder=""
              required
            />
            <label>
              <span>fullname </span>
            </label>
          </div>
          <div className="addfr-inputs-wraps">
            <input
              className="addfr-inputs"
              type="text"
              name="userId"
              value={adminData.userId}
              onChange={handleAdminInputChange}
              placeholder=""
              required
            />
            <label>
              <span>userId </span>
            </label>
          </div>
          <div className="addfr-inputs-wraps">
            <select
              className="addfr-inputs"
              value={adminData.designation}
              onChange={handleAdminInputChange}
              placeholder="Select Designation"
              required
            >
              <option value=""></option>
              <option value="Doctor">Doctor</option>
              <option value="Reception">Reception</option>
              <option value="Thearpy">Therapy</option>
              <option value="FranchiseAdmin">FrAdmin</option>
            </select>
            <label>
              <span> Select designation</span>
            </label>
          </div>
          </div>
   
           <div>
          <div className="addfr-inputs-wraps">
            <input
              className="addfr-inputs"
              type="number"
              name="email"
              value={adminData.email}
              onChange={handleAdminInputChange}
              placeholder=""
              required
            />
            <label>
              <span>Mobile Number </span>
            </label>
          </div>
          <div className="addfr-inputs-wraps">
            <input
              className="addfr-inputs"
              type="text"
              name="password"
              value={adminData.password}
              onChange={handleAdminInputChange}
              placeholder=""
              required
            />
            <label>
              <span>Password </span>
            </label>
          </div>
          </div>
          </div>
          <button className="franchisereg-staff" type="submit">Submit</button>
        </form>


<div  className='franchisestaff-table'>
  <h1>Staff Details</h1>
        <table >
          <thead>
            <tr>
              <th>Fullnmae</th>
              <th>UserId</th>
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
                <td>{admin.fullname}</td>
                <td>{admin.userId}</td>
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
      </div>
    </div>
  );
};

export default FranchiseStaffReg;
